import { useState } from 'react'
import api from '../services/api'

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
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <h1>🎵 MoodMix</h1>
      <p style={{ color: '#888' }}>Type a mood or vibe and we'll build you a playlist</p>

      <div style={{ display: 'flex', gap: '10px', margin: '24px 0' }}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="e.g. late night drive, gym pump, rainy Sunday..."
          style={{ flex: 1, padding: '12px', fontSize: '1rem' }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ padding: '12px 24px', fontSize: '1rem', cursor: 'pointer' }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h2>{result.name}</h2>
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

export default MoodMixPage
