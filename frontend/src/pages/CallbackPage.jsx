import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function CallbackPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      login(token)
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }, [login, navigate])

  return <div style={{ textAlign: 'center', padding: '80px' }}>Logging you in...</div>
}

export default CallbackPage
