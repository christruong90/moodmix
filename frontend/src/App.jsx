import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CallbackPage from './pages/CallbackPage'
import DashboardPage from './pages/DashboardPage'
import MoodMixPage from './pages/MoodMixPage'
import TasteClonePage from './pages/TasteClonePage'
import PartyDJPage from './pages/PartyDJPage'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/moodmix" element={<MoodMixPage />} />
      <Route path="/tasteclone" element={<TasteClonePage />} />
      <Route path="/partydj" element={<PartyDJPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  )
}

export default App
