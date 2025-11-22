// API helper functions for the frontend
const API_BASE = 'https://tito.musstafamahmoud2021.workers.dev'
export async function sendSubmission(payload) {
  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return res
  } catch (err) {
    console.error('Error sending submission:', err)
    return null
  }
}

export async function fetchQuestions() {
  try {
    const res = await fetch(`${API_BASE}/questions`)
    if (!res.ok) throw new Error('Failed to fetch questions')
    return await res.json()
  } catch (err) {
    console.error('Error fetching questions:', err)
    return []
  }
}

export async function getLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`)
    if (!res.ok) throw new Error('Failed to fetch leaderboard')
    return await res.json()
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    return []
  }
}
