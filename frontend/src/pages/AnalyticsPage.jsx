import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import api from '../services/api'

const COLORS = ['#1DB954', '#191414', '#535353', '#B3B3B3', '#FFFFFF']

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

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading your stats...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '80px', color: 'red' }}>{error}</div>

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1>📊 Analytics</h1>
      <p style={{ color: '#888' }}>Your MoodMix listening stats</p>

      {/* Stat card */}
      <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '24px', margin: '32px 0', display: 'inline-block' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data.total_playlists}</div>
        <div style={{ color: '#888' }}>Playlists Generated</div>
      </div>

      {/* Feature breakdown */}
      {data.feature_breakdown.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2>Feature Breakdown</h2>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top genres */}
      {data.top_genres.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2>Top Genres</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.top_genres} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="genre" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#1DB954" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top moods */}
      {data.top_moods.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2>Your Top Moods</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.top_moods} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="mood" width={160} />
              <Tooltip />
              <Bar dataKey="count" fill="#191414" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Mood history */}
      {data.mood_history.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2>Recent Mood History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.mood_history.map((log, i) => (
              <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{log.mood}</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.total_playlists === 0 && (
        <p style={{ color: '#888', marginTop: '32px' }}>No data yet — generate some playlists first!</p>
      )}
    </div>
  )
}

export default AnalyticsPage
