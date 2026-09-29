import { useEffect, useRef, useState } from 'react'
import { LOVE_LETTER } from '../content.js'

export default function LoveLetter() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState('')
  const idx = useRef(0)

  useEffect(() => {
    if (!open) return
    const t = setInterval(() => {
      idx.current += 1
      setShown(LOVE_LETTER.slice(0, idx.current))
      if (idx.current >= LOVE_LETTER.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [open])

  return (
    <section id="letter" className="section">
      <h2 className="script">A letter for you</h2>
      {!open ? (
        <button className="envelope" onClick={() => setOpen(true)}>
          <span className="env-icon">💌</span>
          <span>Open me</span>
        </button>
      ) : (
        <div className="letter">
          <p>
            {shown}
            {shown.length < LOVE_LETTER.length && <span className="caret">|</span>}
          </p>
          {shown.length < LOVE_LETTER.length && (
            <button className="link" onClick={() => { idx.current = LOVE_LETTER.length; setShown(LOVE_LETTER) }}>
              Skip ›
            </button>
          )}
        </div>
      )}
    </section>
  )
}
