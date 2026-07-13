import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NavBar() {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(18, 18, 18, 0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <Link to="/dashboard" style={{ color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
        ← Dashboard
      </Link>
      <span style={{ color: 'var(--border)' }}>|</span>
      <span style={{ color: 'var(--green)', fontWeight: '700', fontSize: '0.95rem' }}>🎵 MoodMix</span>
    </div>
  )
}

export default NavBar
