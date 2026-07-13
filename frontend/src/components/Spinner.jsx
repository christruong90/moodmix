import { motion } from 'framer-motion'

function Spinner({ message = 'Loading...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <motion.div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--border)',
          borderTop: '4px solid var(--green)',
          borderRadius: '50%',
          margin: '0 auto 16px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{message}</p>
    </div>
  )
}

export default Spinner
