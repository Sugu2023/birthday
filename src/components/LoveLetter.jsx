import { useEffect, useRef, useState } from 'react'
import { LETTER_HINT } from '../content.js'
import { decryptLetter } from '../decryptLetter.js'

export default function LoveLetter() {
  const [stage, setStage] = useState('closed') // closed → locked → open
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)
  const [letter, setLetter] = useState('')
  const [shown, setShown] = useState('')
  const idx = useRef(0)

  useEffect(() => {
    if (stage !== 'open') return
    const t = setInterval(() => {
      idx.current += 1
      setShown(letter.slice(0, idx.current))
      if (idx.current >= letter.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [stage, letter])

  const unlock = async (e) => {
    e.preventDefault()
    setChecking(true)
    try {
      setLetter(await decryptLetter(password.trim()))
      setStage('open')
    } catch {
      setError(true)
      setTimeout(() => setError(false), 600)
    }
    setChecking(false)
  }

  return (
    <section id="letter" className="section">
      <h2 className="script">A letter for you</h2>
      {stage === 'closed' && (
        <button className="envelope" onClick={() => setStage('locked')}>
          <span className="env-icon">💌</span>
          <span>Open me</span>
        </button>
      )}
      {stage === 'locked' && (
        <form className={`lock ${error ? 'shake' : ''}`} onSubmit={unlock}>
          <span className="env-icon">🔒</span>
          <p>This letter is only for you. Enter the password, my love.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          <button type="submit" className="unlock-btn" disabled={checking || !password}>
            {checking ? 'Opening…' : 'Unlock 💖'}
          </button>
          <small>{error ? 'Not quite… try again 🥺' : LETTER_HINT}</small>
        </form>
      )}
      {stage === 'open' && (
        <div className="letter">
          <p>
            {shown}
            {shown.length < letter.length && <span className="caret">|</span>}
          </p>
          {shown.length < letter.length && (
            <button className="link" onClick={() => { idx.current = letter.length; setShown(letter) }}>
              Skip ›
            </button>
          )}
        </div>
      )}
    </section>
  )
}
