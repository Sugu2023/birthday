import { useState } from 'react'
import { HER_NAME } from '../content.js'

export default function Cake({ onBlown }) {
  const [lit, setLit] = useState([true, true, true])
  const allOut = lit.every((l) => !l)

  const blow = (i) => {
    const next = lit.map((l, j) => (j === i ? false : l))
    setLit(next)
    if (next.every((l) => !l)) onBlown()
  }

  return (
    <section className="section cake-section">
      <h2 className="script">Make a wish</h2>
      <p className="sub">{allOut ? '' : 'Tap each candle to blow it out 🕯️'}</p>
      <div className="cake">
        <div className="candles">
          {lit.map((on, i) => (
            <button key={i} className="candle" onClick={() => blow(i)} aria-label="Blow candle">
              {on ? <span className="flame" /> : <span className="smoke" />}
            </button>
          ))}
        </div>
        <div className="tier top" />
        <div className="tier bottom"><span>{HER_NAME}</span></div>
        <div className="plate" />
      </div>
      {allOut && (
        <div className="final">
          <p className="script big">Happy Birthday, my love!</p>
          <p>I hope all your wishes come true. I love you more than words can say. 💖</p>
          <button className="link" onClick={() => setLit([true, true, true])}>Light them again ↺</button>
        </div>
      )}
    </section>
  )
}
