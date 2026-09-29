import { HER_NAME } from '../content.js'

export default function Intro({ onOpen }) {
  return (
    <section className="intro">
      <p className="eyebrow">Hey {HER_NAME}…</p>
      <h1 className="script">I made something for you</h1>
      <button className="gift" onClick={onOpen} aria-label="Open your surprise">
        <span className="gift-box">🎁</span>
        <span>Tap to open</span>
      </button>
    </section>
  )
}
