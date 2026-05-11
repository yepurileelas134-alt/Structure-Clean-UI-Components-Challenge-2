// dashboard/DashboardHeader.jsx
// Renders the top header bar: app logo, page title, and a refresh/date display.
// Dashboard-specific: contains the FocusForge branding and greeting.

export default function DashboardHeader({ userName }) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 36,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 800,
            letterSpacing: '-0.5px',
            color: 'var(--text-primary)',
          }}>
            FocusForge
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginLeft: 52 }}>
          Good morning{userName ? `, ${userName}` : ''}! Here's your workload for today.
        </p>
      </div>

      <div style={{
        textAlign: 'right',
        padding: '10px 18px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Today</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{today}</div>
      </div>
    </div>
  )
}
