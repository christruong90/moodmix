import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'
import Spinner from '../components/Spinner'
import NavBar from '../components/NavBar'

function MoodMixPage() {
  const [mood, setMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!mood.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.post('/moodmix/generate', { mood })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a2e1a 0%, #121212 60%)',
    }}>
      <NavBar />
      <div className="page">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          🎵 MoodMix
        </motion.h1>
        <p className="page-subtitle">Type a mood or vibe and we'll build you a playlist</p>

        <motion.div
          style={{ display: 'flex', gap: '10px', margin: '24px 0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. late night drive, gym pump, rainy Sunday..."
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{ whiteSpace: 'nowrap' }}
          >
            Generate
          </button>
        </motion.div>

        {loading && <Spinner message="Claude is crafting your playlist..." />}
        {error && <p className="error">{error}</p>}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 style={{ marginBottom: '8px' }}>{result.name}</h2>
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

export default MoodMixPage
