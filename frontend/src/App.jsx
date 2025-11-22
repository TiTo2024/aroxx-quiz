import React, { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import FormScreen from './components/FormScreen'

const DEFAULT_QUESTIONS = [
  { q: 'هل قطرة أروكس مناسبة للاستخدام اليومي؟', choices: ['نعم', 'لا'], correct: 0 },
  { q: 'هل يمكن استخدام أروكس للأطفال؟', choices: ['نعم', 'حسب سن الطفل'], correct: 1 },
  { q: 'هل أروكس يقلل من الاحمرار؟', choices: ['نعم', 'لا'], correct: 0 }
]

export default function App() {
  const [stage, setStage] = useState('start')
  const [questions] = useState(DEFAULT_QUESTIONS)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  function start() {
    setAnswers([])
    setScore(0)
    setStage('quiz')
  }

  function finishQuiz(userAnswers) {
    setAnswers(userAnswers)
    let c = 0
    for (let i = 0; i < questions.length; i++) if (userAnswers[i] === questions[i].correct) c++
    setScore(c)
    setStage('result')
    setTimeout(() => setStage('form'), 5000)
  }

  return (
    <div className="app-root">
      {stage === 'start' && <StartScreen onStart={start} />}
      {stage === 'quiz' && <QuizScreen questions={questions} onFinish={finishQuiz} />}
      {stage === 'result' && <ResultScreen score={score} total={questions.length} />}
      {stage === 'form' && <FormScreen score={score} total={questions.length} />}
      {stage === 'thanks' && <div className="thanks">شكراً لمشاركتك 🎉</div>}
    </div>
  )
}
