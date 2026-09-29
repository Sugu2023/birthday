import { useEffect, useRef } from 'react'

const COLORS = ['#ff4d8d', '#ffb3c6', '#ffd166', '#c77dff', '#ff8fab', '#ffffff']

export default function Confetti({ trigger }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!trigger) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight }
    resize()
    addEventListener('resize', resize)

    const pieces = Array.from({ length: 180 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 4,
      s: 5 + Math.random() * 7,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      heart: Math.random() < 0.3,
    }))

    let frame
    let t = 0
    const tick = () => {
      t++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach((p) => {
        p.vy += 0.35
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.r += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.r)
        ctx.fillStyle = p.c
        if (p.heart) {
          ctx.font = `${p.s * 2}px serif`
          ctx.fillText('❤', 0, 0)
        } else {
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
        }
        ctx.restore()
      })
      if (t < 240) frame = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    tick()
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize) }
  }, [trigger])

  return <canvas ref={ref} className="confetti" aria-hidden="true" />
}
