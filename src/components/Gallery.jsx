import { useState } from 'react'
import { PHOTOS } from '../content.js'

export default function Gallery() {
  const [active, setActive] = useState(null)
  return (
    <section className="section">
      <h2 className="script">Our moments</h2>
      <div className="gallery">
        {PHOTOS.map((p, i) => (
          <figure
            key={i}
            className="polaroid"
            style={{ '--r': `${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg` }}
            onClick={() => p.src && setActive(p)}
          >
            {p.src ? <img src={p.src} alt={p.caption} loading="lazy" /> : <div className="ph">📷</div>}
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={active.src} alt={active.caption} />
          <p>{active.caption}</p>
        </div>
      )}
    </section>
  )
}
