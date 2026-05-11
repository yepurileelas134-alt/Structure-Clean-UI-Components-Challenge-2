// dashboard/StatsRow.jsx
// Renders the 4 summary metric cards at the top of the dashboard.
// Uses the shared StatCard component. Dashboard-specific because it knows
// which metrics matter on this page and how to derive their values.

import StatCard from '../shared/StatCard'

export default function StatsRow({ total, completed, highPriority, completionRate }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
      <StatCard
        label="Total Tasks"
        value={total}
        icon="📋"
        color="var(--accent)"
        trend={{ positive: true, label: 'Active sprint' }}
      />
      <StatCard
        label="Completed"
        value={completed}
        icon="✅"
        color="#10b981"
        trend={{ positive: true, label: `${completionRate}% done` }}
      />
      <StatCard
        label="High Priority"
        value={highPriority}
        icon="🔥"
        color="#ef4444"
        trend={{ positive: false, label: 'Needs attention' }}
      />
      <StatCard
        label="Remaining"
        value={total - completed}
        icon="⏳"
        color="#f59e0b"
        trend={{ positive: total - completed === 0, label: total - completed === 0 ? 'All done!' : 'In progress' }}
      />
    </div>
  )
}
