import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CallbackPage from './pages/CallbackPage'
import DashboardPage from './pages/DashboardPage'
import MoodMixPage from './pages/MoodMixPage'
import TasteClonePage from './pages/TasteClonePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/moodmix" element={<MoodMixPage />} />
      <Route path="/tasteclone" element={<TasteClonePage />} />
    </Routes>
  )
}

export default App
