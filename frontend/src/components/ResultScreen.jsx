import { useState, useEffect } from 'react'
import { getLeaderboard } from '../utils/api'

export default function ResultScreen({ score = 0, total = 0, onRetry }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [showCelebration, setShowCelebration] = useState(true)

  useEffect(() => {
    loadLeaderboard()
    // Trigger celebrations on mount
    if (showCelebration) {
      createFireworks()
      createBalloons()
      createConfetti()
    }
  }, [])

  const loadLeaderboard = async () => {
    const data = await getLeaderboard()
    setLeaderboard(data)
  }

  const createFireworks = () => {
    const container = document.querySelector('.celebration-container')
    if (!container) return

    // Create multiple firework bursts
    for (let burst = 0; burst < 5; burst++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.1
        
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcf7f', '#c77dff', '#ff6b9d']
        const particleCount = 30
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div')
          particle.className = 'firework-particle'
          
          const angle = (i / particleCount) * Math.PI * 2
          const velocity = 4 + Math.random() * 4
          const tx = Math.cos(angle) * velocity * 60
          const ty = Math.sin(angle) * velocity * 60
          
          particle.style.left = x + 'px'
          particle.style.top = y + 'px'
          particle.style.background = colors[Math.floor(Math.random() * colors.length)]
          particle.style.setProperty('--tx', tx + 'px')
          particle.style.setProperty('--ty', ty + 'px')
          
          container.appendChild(particle)
          
          setTimeout(() => particle.remove(), 1000)
        }
      }, burst * 400)
    }
  }

  const createBalloons = () => {
    const container = document.querySelector('.celebration-container')
    if (!container) return

    const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'pink']
    const balloonCount = 12
    
    for (let i = 0; i < balloonCount; i++) {
      setTimeout(() => {
        const balloon = document.createElement('div')
        balloon.className = `balloon ${colors[i % colors.length]}`
        balloon.style.left = Math.random() * (window.innerWidth - 30) + 'px'
        balloon.style.animationDelay = Math.random() * 0.5 + 's'
        balloon.style.animationDuration = (5 + Math.random() * 2) + 's'
        
        container.appendChild(balloon)
        
        setTimeout(() => balloon.remove(), 8000)
      }, i * 150)
    }
  }

  const createConfetti = () => {
    const container = document.querySelector('.celebration-container')
    if (!container) return

    const confettiPieces = 50
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcf7f', '#c77dff', '#ff6b9d']
    
    for (let i = 0; i < confettiPieces; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * window.innerWidth + 'px'
      confetti.style.top = '-10px'
      confetti.style.width = (Math.random() * 8 + 4) + 'px'
      confetti.style.height = (Math.random() * 8 + 4) + 'px'
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = '50%'
      confetti.style.animationDelay = Math.random() * 0.3 + 's'
      confetti.style.animationDuration = (3 + Math.random() * 2) + 's'
      
      container.appendChild(confetti)
      
      setTimeout(() => confetti.remove(), 5000)
    }
  }

  const handleRetry = () => {
    setShowCelebration(false)
    if (onRetry) onRetry()
  }

  return (
    <>
      <div className="celebration-container"></div>
      <div className="screen result-screen">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="success-badge" style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '64px' }}>🎉</span>
          </div>
          
          <h2>انتهى الاختبار!</h2>

          <div className="score-display score-pulse">
            <h3>نتيجتك: {score} / {total}</h3>
            <p>شكراً لك على المشاركة</p>
          </div>

          {leaderboard.length > 0 && (
            <div className="leaderboard">
              <h4>أفضل الدرجات</h4>
              <ul>
                {leaderboard.slice(0, 5).map((entry, index) => (
                  <li key={index}>
                    <span className="rank">{index + 1}</span>
                    <span className="name">{entry.name}</span>
                    <span className="score">{entry.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={handleRetry} className="retry-btn">
            شارك مرة أخرى
          </button>
        </div>
      </div>
    </>
  )
}
