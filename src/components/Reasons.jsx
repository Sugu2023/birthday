import { useState } from 'react'
import { REASONS } from '../content.js'

export default function Reasons() {
  const [flipped, setFlipped] = useState({})
  return (
    <section className="section">
      <h2 className="script">Why I love you</h2>
      <p className="sub">Tap a card 💕</p>
      <div className="cards">
        {REASONS.map((r, i) => (
          <button
            key={i}
            className={`card ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
          >
            <div className="card-inner">
              <div className="face front">
                <span className="emoji">{r.emoji}</span>
                <span>{r.front}</span>
              </div>
              <div className="face back">{r.back}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
