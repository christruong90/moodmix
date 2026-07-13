import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import Spinner from '../components/Spinner'
import NavBar from '../components/NavBar'

function PartyDJPage() {
  const [view, setView] = useState('menu')
  const [joinCode, setJoinCode] = useState('')
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCreateRoom = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/partydj/rooms')
      setRoom(response.data)
      setView('host')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create room.')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinRoom = async () => {
    if (!joinCode.trim()) return
    setLoading(true)
    setError(null)
    try {
      const response = await api.post(`/partydj/rooms/${joinCode}/join`)
      setRoom(response.data)
      setView('guest')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to join room.')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post(`/partydj/rooms/${room.code}/generate`)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate playlist.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #2e1a2e 0%, #121212 60%)',
    }}>
      <NavBar />
      <div className="page">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          🎉 PartyDJ
        </motion.h1>
        <p className="page-subtitle">Generate a group playlist that everyone will love</p>

        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}
            >
              <motion.button
                onClick={handleCreateRoom}
                disabled={loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                🎵 Create a Room
              </motion.button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Enter room code..."
                  maxLength={6}
                  style={{ flex: 1 }}
                />
                <button onClick={handleJoinRoom} disabled={loading}>
                  Join
                </button>
              </div>
            </motion.div>
          )}

          {view === 'host' && room && !result && (
            <motion.div
              key="host"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              style={{ marginTop: '32px', textAlign: 'center' }}
            >
              <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Share this code with your friends:</p>
              <div className="room-code">{room.code}</div>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Once everyone has joined, generate the playlist.</p>
              {loading
                ? <Spinner message="Generating your group playlist..." />
                : (
                  <motion.button
                    onClick={handleGenerate}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    🎵 Generate Playlist
                  </motion.button>
                )
              }
            </motion.div>
          )}

          {view === 'guest' && room && (
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '32px', textAlign: 'center' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
              <p style={{ fontSize: '1.1rem' }}>You've joined room <strong style={{ color: 'var(--green)' }}>{room.code}</strong></p>
              <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Wait for the host to generate the playlist.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="error">{error}</p>}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '32px' }}
          >
            <h2 style={{ marginBottom: '4px' }}>{result.name}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '12px' }}>{result.member_count} members · {result.tracks.length} tracks</p>
            <a href={result.playlist_url} target="_blank" rel="noreferrer" className="spotify-link">
              Open in Spotify ↗
            </a>
            <ul className="track-list">
              {result.tracks.map((track, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {track}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PartyDJPage
