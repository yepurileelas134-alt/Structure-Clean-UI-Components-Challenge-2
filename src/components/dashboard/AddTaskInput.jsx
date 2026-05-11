// dashboard/AddTaskInput.jsx
// Renders the controlled input + priority selector + Add button.
// Dashboard-specific because task creation is a dashboard concern.
// Receives value, priority, and onChange/onSubmit handlers via props.

export default function AddTaskInput({ value, priority, onChange, onPriorityChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit()
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      marginBottom: 20,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
    }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          fontSize: 16, pointerEvents: 'none',
        }}>✏️</span>
        <input
          id="new-task-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task… press Enter or click Add"
          style={{
            width: '100%', padding: '11px 14px 11px 40px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      <select
        id="task-priority-select"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        style={{
          padding: '11px 14px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          color: 'var(--text-primary)',
          fontSize: 13, fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>

      <button
        id="add-task-button"
        onClick={onSubmit}
        disabled={!value.trim()}
        style={{
          padding: '11px 22px',
          background: value.trim() ? 'var(--accent)' : 'var(--surface-3)',
          border: 'none',
          borderRadius: 'var(--radius)',
          color: value.trim() ? '#000' : 'var(--text-muted)',
          fontSize: 14, fontWeight: 700,
          cursor: value.trim() ? 'pointer' : 'not-allowed',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s',
        }}
      >
        + Add Task
      </button>
    </div>
  )
}
