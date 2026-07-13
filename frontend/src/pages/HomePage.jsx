import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>🎵 MoodMix</h1>
      <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px' }}>
        AI-powered playlists for every mood
      </p>
      <button onClick={handleLogin} style={{ padding: '14px 32px', fontSize: '1rem', cursor: 'pointer' }}>
        Login with Spotify
      </button>
    </div>
  )
}

export default HomePage
