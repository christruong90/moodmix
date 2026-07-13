import { useState } from 'react'
import api from '../services/api'

function TasteClonePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFetch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.get('/tasteclone/recommendations')
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <h1>🧬 TasteClone</h1>
      <p style={{ color: '#888' }}>Discover new artists based on your listening history</p>

      <button
        onClick={handleFetch}
        disabled={loading}
        style={{ padding: '12px 24px', fontSize: '1rem', cursor: 'pointer', marginTop: '24px' }}
      >
        {loading ? 'Analysing your taste...' : 'Find My Artists'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3>Your Top Genres</h3>
            <p style={{ color: '#888' }}>{result.top_genres.join(', ')}</p>
          </div>

          <h3>Artists You Might Love</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {result.recommendations.map((artist, i) => (
              <li key={i} style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
                <strong>{artist.name}</strong>
                <span style={{ color: '#888', marginLeft: '8px', fontSize: '0.9rem' }}>
                  {artist.genre}
                </span>
                <p style={{ margin: '4px 0 0', color: '#555' }}>{artist.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TasteClonePage
