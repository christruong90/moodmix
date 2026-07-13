import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'
import Spinner from '../components/Spinner'
import NavBar from '../components/NavBar'

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
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #121212 60%)',
    }}>
      <NavBar />
      <div className="page">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          🧬 TasteClone
        </motion.h1>
        <p className="page-subtitle">Discover new artists based on your listening history</p>

        <motion.button
          onClick={handleFetch}
          disabled={loading}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{ marginTop: '8px' }}
        >
          Find My Artists
        </motion.button>

        {loading && <Spinner message="Analysing your taste..." />}
        {error && <p className="error">{error}</p>}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '32px' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '8px' }}>Your Top Genres</h3>
              <p style={{ color: 'var(--muted)' }}>{result.top_genres.join(', ')}</p>
            </div>

            <h3 style={{ marginBottom: '16px' }}>Artists You Might Love</h3>
            {result.recommendations.map((artist, i) => (
              <motion.div
                key={i}
                className="card"
                style={{ marginBottom: '12px' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '1.05rem' }}>{artist.name}</strong>
                  <span style={{ color: 'var(--green)', fontSize: '0.85rem' }}>{artist.genre}</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{artist.reason}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TasteClonePage
