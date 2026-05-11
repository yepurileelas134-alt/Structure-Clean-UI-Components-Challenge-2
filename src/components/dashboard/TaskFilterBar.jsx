// dashboard/TaskFilterBar.jsx
// Renders the filter tabs (All / Active / Completed) and a search input.
// Dashboard-specific: knows about the filter domain for this page.
// Receives current filter state and change handlers via props.

export default function TaskFilterBar({ activeFilter, searchQuery, taskCounts, onFilterChange, onSearchChange }) {
  const filters = [
    { key: 'all',       label: 'All',       count: taskCounts.all       },
    { key: 'active',    label: 'Active',    count: taskCounts.active    },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
    { key: 'high',      label: '🔥 High',   count: taskCounts.high      },
  ]

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 20px',
      borderBottom: '1px solid var(--border)',
      gap: 12,
      flexWrap: 'wrap',
    }}>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        {filters.map(f => (
          <button
            key={f.key}
            id={`filter-${f.key}`}
            onClick={() => onFilterChange(f.key)}
            style={{
              padding: '7px 14px',
              background: activeFilter === f.key ? 'var(--accent)' : 'transparent',
              border: activeFilter === f.key ? 'none' : '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: activeFilter === f.key ? '#000' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
          >
            {f.label}
            <span style={{
              fontSize: 11,
              background: activeFilter === f.key ? 'rgba(0,0,0,0.15)' : 'var(--surface-2)',
              color: activeFilter === f.key ? '#000' : 'var(--text-muted)',
              padding: '1px 6px',
              borderRadius: 10,
              fontWeight: 700,
            }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: 13, color: 'var(--text-muted)', pointerEvents: 'none',
        }}>🔍</span>
        <input
          id="task-search-input"
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          style={{
            padding: '7px 12px 7px 30px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            fontSize: 13,
            outline: 'none',
            fontFamily: 'inherit',
            width: 180,
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>
    </div>
  )
}
