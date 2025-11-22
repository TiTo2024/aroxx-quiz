import React, { useState } from 'react'
import { sendSubmission } from '../utils/api'

export default function FormScreen({ score, total }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function submit() {
    if (!name.trim() || !phone.trim()) {
      setStatus('من فضلك أدخل الاسم ورقم التليفون')
      return
    }

    setIsLoading(true)
    setStatus('جاري الإرسال...')
    const payload = { 
      product: 'قطرة أروكس', 
      name, 
      phone, 
      addr, 
      score, 
      total, 
      timestamp: new Date().toISOString() 
    }

    try {
      const res = await sendSubmission(payload)
      if (res && res.ok) {
        setStatus('تم الإرسال بنجاح ✅ شكراً لمشاركتك')
        setName('')
        setPhone('')
        setAddr('')
      } else {
        let text = ''
        try { text = await res.text() } catch {}
        setStatus('فشل الإرسال: ' + (text || 'خطأ في الخادم'))
      }
    } catch (err) {
      console.error(err)
      setStatus('خطأ في الاتصال بالإنترنت ❌')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card form">
      <h2>معلوماتك</h2>
      <p style={{ marginBottom: '24px' }}>من فضلك أكمل بياناتك للدخول في السحب</p>
      
      <div className="form-group">
        <label htmlFor="name">الاسم الكامل *</label>
        <input
          id="name"
          type="text"
          placeholder="أدخل اسمك الكامل"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">رقم التليفون *</label>
        <input
          id="phone"
          type="tel"
          placeholder="أدخل رقم التليفون"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="addr">العنوان / اسم العيادة</label>
        <input
          id="addr"
          type="text"
          placeholder="(اختياري)"
          value={addr}
          onChange={e => setAddr(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <button onClick={submit} disabled={isLoading}>{isLoading ? 'جاري الإرسال...' : 'إرسال'}</button>
      {status && (
        <div className={`status ${status.includes('نجاح') ? 'success' : status.includes('خطأ') || status.includes('فشل') ? 'error' : ''}`}>
          {status}
        </div>
      )}
    </div>
  )
}
