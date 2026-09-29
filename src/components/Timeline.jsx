import { TIMELINE } from '../content.js'

export default function Timeline() {
  return (
    <section className="section">
      <h2 className="script">Our story</h2>
      <ol className="timeline">
        {TIMELINE.map((t, i) => (
          <li key={i}>
            <span className="dot">❤</span>
            <div className="moment">
              <small>{t.date}</small>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
