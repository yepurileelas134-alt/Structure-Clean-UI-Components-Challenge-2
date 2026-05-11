// pages/DashboardPage.jsx
// The page component. Its ONLY job is to:
//   1. Own and declare all state
//   2. Derive computed values from state
//   3. Define event handlers that mutate state
//   4. Compose child components by passing down the right data
//
// There is zero raw HTML layout here — the page is a table of contents,
// not the entire book.

import { useState } from 'react'
import { INITIAL_TASKS } from '../data/tasks'

import DashboardHeader  from '../components/dashboard/DashboardHeader'
import StatsRow         from '../components/dashboard/StatsRow'
import AddTaskInput     from '../components/dashboard/AddTaskInput'
import TaskList         from '../components/dashboard/TaskList'

export default function DashboardPage() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [tasks,        setTasks]        = useState(INITIAL_TASKS)
  const [newTaskText,  setNewTaskText]  = useState('')
  const [newPriority,  setNewPriority]  = useState('medium')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery,  setSearchQuery]  = useState('')

  // ── DERIVED VALUES ─────────────────────────────────────────────────────────
  const completedCount  = tasks.filter(t => t.completed).length
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && !t.completed).length
  const completionRate  = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const taskCounts = {
    all:       tasks.length,
    active:    tasks.filter(t => !t.completed).length,
    completed: completedCount,
    high:      tasks.filter(t => t.priority === 'high').length,
  }

  const filteredTasks = tasks
    .filter(t => {
      if (activeFilter === 'active')    return !t.completed
      if (activeFilter === 'completed') return t.completed
      if (activeFilter === 'high')      return t.priority === 'high'
      return true
    })
    .filter(t =>
      searchQuery.trim() === '' ||
      t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // ── EVENT HANDLERS ─────────────────────────────────────────────────────────
  const handleAddTask = () => {
    if (!newTaskText.trim()) return
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    setTasks(prev => [
      { id: nextId, text: newTaskText.trim(), completed: false, priority: newPriority, tag: 'New' },
      ...prev,
    ])
    setNewTaskText('')
    setNewPriority('medium')
  }

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // ── COMPOSITION ────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>
      <DashboardHeader userName="Developer" />

      <StatsRow
        total={tasks.length}
        completed={completedCount}
        highPriority={highPriorityCount}
        completionRate={completionRate}
      />

      <AddTaskInput
        value={newTaskText}
        priority={newPriority}
        onChange={setNewTaskText}
        onPriorityChange={setNewPriority}
        onSubmit={handleAddTask}
      />

      <TaskList
        tasks={filteredTasks}
        totalCount={tasks.length}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        taskCounts={taskCounts}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}
