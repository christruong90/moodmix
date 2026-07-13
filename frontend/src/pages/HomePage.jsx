import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, navigate])

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/spotify/login'
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      background: 'linear-gradient(135deg, #191414 0%, #1a1a2e 40%, #16213e 70%, #191414 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 8s ease infinite',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Floating music notes */}
      {['🎵', '🎶', '🎸', '🎹', '🎤'].map((note, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            opacity: 0.15,
            top: `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        >
          {note}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-2px' }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎵 MoodMix
        </motion.h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '16px', maxWidth: '420px' }}>
          AI-powered playlists for every mood.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '48px', maxWidth: '420px' }}>
          Powered by <span style={{ color: 'var(--green)' }}>Spotify</span> and <span style={{ color: 'var(--green)' }}>Claude AI</span>.
        </p>

        <motion.button
          onClick={handleLogin}
          style={{ fontSize: '1rem', padding: '16px 48px' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          Login with Spotify
        </motion.button>
      </motion.div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export default HomePage
