import { useEffect, useState } from 'react'
import { BIRTHDAY, HER_NAME, WISHES } from '../content.js'

function getTarget(now) {
  const y = now.getFullYear()
  const t = new Date(y, BIRTHDAY.month - 1, BIRTHDAY.day)
  const end = new Date(y, BIRTHDAY.month - 1, BIRTHDAY.day + 1)
  if (now >= t && now < end) return { isToday: true }
  return { isToday: false, target: now < t ? t : new Date(y + 1, BIRTHDAY.month - 1, BIRTHDAY.day) }
}

export default function Hero() {
  const [now, setNow] = useState(new Date())
  const [wish, setWish] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    const w = setInterval(() => setWish((i) => (i + 1) % WISHES.length), 2800)
    return () => { clearInterval(t); clearInterval(w) }
  }, [])

  const { isToday, target } = getTarget(now)
  let parts = []
  if (!isToday) {
    const diff = target - now
    parts = [
      ['Days', Math.floor(diff / 864e5)],
      ['Hours', Math.floor(diff / 36e5) % 24],
      ['Minutes', Math.floor(diff / 6e4) % 60],
      ['Seconds', Math.floor(diff / 1e3) % 60],
    ]
  }

  return (
    <section className="hero">
      <p className="eyebrow">October 2nd</p>
      <h1 className="title">
        Happy Birthday
        <span className="script name">{HER_NAME}</span>
      </h1>
      {isToday ? (
        <p className="today">🎉 Today is your day, my love! 🎉</p>
      ) : (
        <div className="countdown">
          {parts.map(([label, v]) => (
            <div key={label} className="tick">
              <b>{String(v).padStart(2, '0')}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
      )}
      <p key={wish} className="wish">{WISHES[wish]}</p>
      <a href="#letter" className="scroll-hint">Scroll down ↓</a>
    </section>
  )
}
