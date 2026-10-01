import { useEffect, useRef, useState } from 'react'
import { AGE, COUPLE_NAME, HER_NAME } from '../content.js'

export default function TwentyFive() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  // Light the hearts one by one once the section scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="section twentyfive">
      <p className="eyebrow">A quarter century of you</p>
      <div className="big-age" aria-label={`${AGE}`}>
        {AGE}
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">✧</span>
        <span className="sparkle s3">✦</span>
      </div>
      <h2 className="script">Happy {AGE}th, {HER_NAME}</h2>
      <p className="couple-tag">#{COUPLE_NAME}</p>

      <div className={`year-hearts ${visible ? 'on' : ''}`}>
        {Array.from({ length: AGE }, (_, i) => (
          <span key={i} style={{ transitionDelay: `${i * 90}ms` }} title={`Year ${i + 1}`}>❤</span>
        ))}
      </div>
      <p className="sub">One heart for every year you have made this world brighter.</p>
    </section>
  )
}
