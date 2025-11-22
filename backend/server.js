 const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// ضع هنا رابط Google Apps Script Web App بعد نشره
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwx-yrKkjjQQ78a3l5CRLC5zipEV8iCEIgPIa6b_WQjymB-VfnbhPfYW2TRwopg6XQ/exec'

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Aroxx Quiz Backend is running' })
})

app.post('/submit', async (req, res) => {
  const payload = req.body;

  try {
    const r = await fetch("https://script.google.com/macros/s/AKfycbwhQaUJrVfj4oilhQ8wAyfk3xiBpntJ_1pTnMO4BVfVh5kOwKyzwN4abM0gMLLbFU5J/exec", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await r.text();
    res.status(200).send(text);
  } catch (err) {
    console.error('forward error', err);
    res.status(500).json({ error: 'forward_failed' });
  }
});


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Backend listening on port', PORT))
