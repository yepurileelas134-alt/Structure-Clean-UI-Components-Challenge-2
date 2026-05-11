// shared/StatCard.jsx
// A reusable card that renders a label, a value, an icon, and an optional trend.
// It has zero knowledge of any specific page — receives everything via props.

export default function StatCard({ label, value, icon, color, trend }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: color || 'var(--text-primary)', fontFamily: 'var(--mono)' }}>
        {value}
      </div>
      {trend && (
        <div style={{ fontSize: 12, color: trend.positive ? '#10b981' : '#ef4444', fontWeight: 500 }}>
          {trend.positive ? '↑' : '↓'} {trend.label}
        </div>
      )}
    </div>
  )
}
