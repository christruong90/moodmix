import { useState } from 'react'
import api from '../services/api'

function PartyDJPage() {
  const [view, setView] = useState('menu') // menu | host | guest
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
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <h1>🎉 PartyDJ</h1>
      <p style={{ color: '#888' }}>Generate a group playlist that everyone will love</p>

      {view === 'menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
          <button
            onClick={handleCreateRoom}
            disabled={loading}
            style={{ padding: '16px', fontSize: '1rem', cursor: 'pointer' }}
          >
            {loading ? 'Creating...' : '🎵 Create a Room'}
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code..."
              style={{ flex: 1, padding: '12px', fontSize: '1rem' }}
              maxLength={6}
            />
            <button
              onClick={handleJoinRoom}
              disabled={loading}
              style={{ padding: '12px 24px', fontSize: '1rem', cursor: 'pointer' }}
            >
              Join
            </button>
          </div>
        </div>
      )}

      {view === 'host' && room && !result && (
        <div style={{ marginTop: '32px' }}>
          <p>Share this code with your friends:</p>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '8px', margin: '16px 0' }}>
            {room.code}
          </div>
          <p style={{ color: '#888' }}>Once everyone has joined, generate the playlist.</p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{ padding: '14px 32px', fontSize: '1rem', cursor: 'pointer', marginTop: '16px' }}
          >
            {loading ? 'Generating...' : '🎵 Generate Playlist'}
          </button>
        </div>
      )}

      {view === 'guest' && room && (
        <div style={{ marginTop: '32px' }}>
          <p>✅ You've joined room <strong>{room.code}</strong></p>
          <p style={{ color: '#888' }}>Wait for the host to generate the playlist.</p>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '32px' }}>
          <h2>{result.name}</h2>
          <p style={{ color: '#888' }}>{result.member_count} members · {result.tracks.length} tracks</p>
          <a href={result.playlist_url} target="_blank" rel="noreferrer">
            Open in Spotify ↗
          </a>
          <ul style={{ marginTop: '16px' }}>
            {result.tracks.map((track, i) => (
              <li key={i} style={{ padding: '6px 0' }}>{track}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PartyDJPage
