// dashboard/TaskList.jsx
// Renders the task table container: header, filter bar, task rows, and empty state.
// Dashboard-specific because it composes the filter bar with the task list.
// Receives filtered tasks and all event handlers via props.

import TaskFilterBar from './TaskFilterBar'
import TaskItem from '../shared/TaskItem'

export default function TaskList({
  tasks,
  totalCount,
  activeFilter,
  searchQuery,
  taskCounts,
  onFilterChange,
  onSearchChange,
  onToggle,
  onDelete,
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Panel header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
          Task List
          <span style={{ marginLeft: 10, fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>
            {tasks.length} of {totalCount}
          </span>
        </h2>
        {searchQuery && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Showing results for <strong style={{ color: 'var(--accent)' }}>"{searchQuery}"</strong>
          </span>
        )}
      </div>

      {/* Filter bar */}
      <TaskFilterBar
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        taskCounts={taskCounts}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
      />

      {/* Task rows */}
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div style={{
          padding: '60px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: 40 }}>
            {searchQuery ? '🔍' : activeFilter === 'completed' ? '🎉' : '📋'}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
            {searchQuery
              ? 'No tasks match your search'
              : activeFilter === 'completed'
              ? 'No completed tasks yet'
              : activeFilter === 'high'
              ? 'No high-priority tasks'
              : 'No tasks here!'}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 280 }}>
            {searchQuery
              ? `Try a different search term.`
              : activeFilter === 'all'
              ? 'Add your first task above to get started.'
              : 'Change the filter to see other tasks.'}
          </p>
        </div>
      )}

      {/* Footer summary */}
      {tasks.length > 0 && (
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}>
          <span>{taskCounts.completed} completed · {taskCounts.active} remaining</span>
          <span>Press Enter to add tasks quickly</span>
        </div>
      )}
    </div>
  )
}
