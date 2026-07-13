import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { logout } = useAuth()

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🎵 MoodMix</h1>
        <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>
        <Link to="/moodmix" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none' }}>
          <h2>🎵 MoodMix</h2>
          <p style={{ color: '#888' }}>Type a mood, get a playlist</p>
        </Link>

        <Link to="/tasteclone" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none' }}>
          <h2>🧬 TasteClone</h2>
          <p style={{ color: '#888' }}>Discover artists based on your taste</p>
        </Link>

        <Link to="/partydj" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none' }}>
          <h2>🎉 PartyDJ</h2>
          <p style={{ color: '#888' }}>Generate a group playlist with friends</p>
        </Link>

        <Link to="/analytics" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none' }}>
          <h2>📊 Analytics</h2>
          <p style={{ color: '#888' }}>Your music stats and mood history</p>
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage
