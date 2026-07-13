import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import api from '../services/api'
import Spinner from '../components/Spinner'
import NavBar from '../components/NavBar'

const COLORS = ['#1DB954', '#1a78c2', '#9b59b6', '#e67e22', '#e74c3c']

function AnalyticsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/analytics/summary')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.detail || 'Failed to load analytics.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #7a3500 0%, #121212 60%)' }}>
      <Spinner message="Loading your stats..." />
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #7a3500 0%, #121212 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="error">{error}</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #7a3500 0%, #121212 60%)' }}>
      <NavBar />
      <div className="page" style={{ maxWidth: '800px' }}>
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          📊 Analytics
        </motion.h1>
        <p className="page-subtitle">Your MoodMix listening stats</p>

        <div className="stat-card">
          <div className="number">{data.total_playlists}</div>
          <div className="label">Playlists Generated</div>
        </div>

        {data.feature_breakdown.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>Feature Breakdown</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.feature_breakdown}
                  dataKey="count"
                  nameKey="feature"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ feature, count }) => `${feature}: ${count}`}
                >
                  {data.feature_breakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ background: '#282828', border: 'none', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {data.top_genres.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>Top Genres</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.top_genres} layout="vertical">
                <XAxis type="number" stroke="#B3B3B3" />
                <YAxis type="category" dataKey="genre" width={120} stroke="#B3B3B3" />
                <Tooltip contentStyle={{ background: '#282828', border: 'none', color: '#fff' }} />
                <Bar dataKey="count" fill="#1DB954" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {data.top_moods.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>Your Top Moods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.top_moods} layout="vertical">
                <XAxis type="number" stroke="#B3B3B3" />
                <YAxis type="category" dataKey="mood" width={160} stroke="#B3B3B3" />
                <Tooltip contentStyle={{ background: '#282828', border: 'none', color: '#fff' }} />
                <Bar dataKey="count" fill="#9b59b6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {data.mood_history.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>Recent Mood History</h2>
            <ul className="track-list">
              {data.mood_history.map((log, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{log.mood}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    {new Date(log.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.total_playlists === 0 && (
          <p style={{ color: 'var(--muted)', marginTop: '32px' }}>No data yet — generate some playlists first!</p>
        )}
      </div>
    </div>
  )
}

export default AnalyticsPage
