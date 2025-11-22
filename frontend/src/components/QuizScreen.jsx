import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function QuizScreen({ questions, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])

  const [error, setError] = useState('')

  function choose(i) {
    setSelected(i)
    setError('')
  }

  function next() {
    if (selected === null) {
      setError('من فضلك اختر إجابة')
      return
    }
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    setError('')
    if (idx + 1 < questions.length) { setIdx(idx + 1) }
    else { onFinish(newAnswers) }
  }

  const q = questions[idx]
  const progress = ((idx + 1) / questions.length) * 100

  return (
    <motion.div className="card quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ height: '4px', background: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#0066cc', width: `${progress}%`, transition: 'width 0.3s ease' }}></div>
        </div>
      </div>
      <h2 className="q">{q.q}</h2>
      <div className="choices">
        {q.choices.map((c, i) => (
          <button
            key={i}
            className={`choice ${selected === i ? 'selected' : ''}`}
            onClick={() => choose(i)}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>
      {error && <div className="status error">{error}</div>}
      <div className="pager">سؤال {idx + 1} من {questions.length}</div>
      <button className="next" onClick={next}>{idx === questions.length - 1 ? 'إنهاء' : 'التالي'}</button>
    </motion.div>
  )
}
