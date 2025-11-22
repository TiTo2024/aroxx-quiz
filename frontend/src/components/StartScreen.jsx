import React from 'react'
import { motion } from 'framer-motion'

export default function StartScreen({ onStart }) {
  return (
    <motion.div className="card start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="brand">
        <div className="logo">أروكس</div>
        <div>
          <h1>قطرة أروكس</h1>
          <p className="lead">جاوب على 3 أسئلة بسيطة وادخل بياناتك للدخول على السحب</p>
        </div>
      </div>
      <button className="cta" onClick={onStart}>ابدأ اللعبة</button>
    </motion.div>
  )
}
