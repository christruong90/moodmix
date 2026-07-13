import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const features = [
  { to: '/moodmix', emoji: '🎵', title: 'MoodMix', desc: 'Type a mood, get a playlist', color: '#1DB954' },
  { to: '/tasteclone', emoji: '🧬', title: 'TasteClone', desc: 'Discover artists based on your taste', color: '#1a78c2' },
  { to: '/partydj', emoji: '🎉', title: 'PartyDJ', desc: 'Generate a group playlist with friends', color: '#9b59b6' },
  { to: '/analytics', emoji: '📊', title: 'Analytics', desc: 'Your music stats and mood history', color: '#e67e22' },
]

function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #121212 60%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating notes */}
      {['🎵', '🎶', '🎸', '🎹', '🎤', '🎧', '🎼'].map((note, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            opacity: 0.07,
            top: `${8 + i * 13}%`,
            left: `${3 + i * 14}%`,
            pointerEvents: 'none',
          }}
          animate={{ y: [-15, 15, -15], rotate: [-8, 8, -8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {note}
        </motion.div>
      ))}
      <div className="page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <motion.h1
            style={{ fontSize: '2.5rem', fontWeight: '800' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎵 MoodMix
          </motion.h1>
          <button
            onClick={() => { logout(); navigate('/') }}
            style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', padding: '8px 20px', fontSize: '0.85rem' }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{ borderRadius: '8px' }}
            >
              <Link to={f.to} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  background: `linear-gradient(135deg, #282828 0%, #282828 60%, ${f.color}22 100%)`,
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: `3px solid ${f.color}`,
                  transition: 'background 0.2s',
                }}>
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '4px', color: f.color }}>
                    {f.emoji} {f.title}
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{f.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
