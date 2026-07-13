import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import CallbackPage from './pages/CallbackPage'
import DashboardPage from './pages/DashboardPage'
import MoodMixPage from './pages/MoodMixPage'
import TasteClonePage from './pages/TasteClonePage'
import PartyDJPage from './pages/PartyDJPage'
import AnalyticsPage from './pages/AnalyticsPage'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/callback" element={<PageWrapper><CallbackPage /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/moodmix" element={<PageWrapper><MoodMixPage /></PageWrapper>} />
        <Route path="/tasteclone" element={<PageWrapper><TasteClonePage /></PageWrapper>} />
        <Route path="/partydj" element={<PageWrapper><PartyDJPage /></PageWrapper>} />
        <Route path="/analytics" element={<PageWrapper><AnalyticsPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
