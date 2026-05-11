// shared/TaskItem.jsx
// A reusable row that renders a single task.
// It knows nothing about the task list or any page — receives task data
// and event handlers as props.

const PRIORITY_CONFIG = {
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   label: 'High'   },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  label: 'Medium' },
  low:    { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  label: 'Low'    },
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const p = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'background 0.15s',
      background: task.completed ? 'var(--surface-2)' : 'transparent',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
      onMouseLeave={e => e.currentTarget.style.background = task.completed ? 'var(--surface-2)' : 'transparent'}
    >
      {/* Checkbox */}
      <button
        id={`toggle-${task.id}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        style={{
          width: 22, height: 22, borderRadius: 6,
          border: task.completed ? 'none' : '2px solid var(--border)',
          background: task.completed ? 'var(--accent)' : 'transparent',
          cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontSize: 13, fontWeight: 700,
          transition: 'all 0.15s',
        }}
      >
        {task.completed ? '✓' : ''}
      </button>

      {/* Task text */}
      <span style={{
        flex: 1,
        fontSize: 14,
        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
        textDecoration: task.completed ? 'line-through' : 'none',
        transition: 'all 0.2s',
      }}>
        {task.text}
      </span>

      {/* Tag */}
      <span style={{
        fontSize: 11, fontWeight: 600, padding: '3px 8px',
        borderRadius: 4, background: 'var(--surface-3)',
        color: 'var(--text-secondary)', whiteSpace: 'nowrap',
      }}>
        {task.tag}
      </span>

      {/* Priority badge */}
      <span style={{
        fontSize: 11, fontWeight: 700, padding: '3px 10px',
        borderRadius: 20, background: p.bg, color: p.color,
        whiteSpace: 'nowrap',
      }}>
        {p.label}
      </span>

      {/* Delete */}
      <button
        id={`delete-${task.id}`}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: 16, padding: '0 4px',
          borderRadius: 4, transition: 'color 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        ×
      </button>
    </div>
  )
}
