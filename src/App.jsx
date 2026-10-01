import { useState } from 'react'
import FloatingHearts from './components/FloatingHearts.jsx'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import Reasons from './components/Reasons.jsx'
import Timeline from './components/Timeline.jsx'
import Gallery from './components/Gallery.jsx'
import Cake from './components/Cake.jsx'
import Confetti from './components/Confetti.jsx'
import TwentyFive from './components/TwentyFive.jsx'
import { COUPLE_NAME, HER_NAME, MY_NAME } from './content.js'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [celebrate, setCelebrate] = useState(0)

  if (!opened) {
    return (
      <>
        <FloatingHearts />
        <Intro onOpen={() => { setOpened(true); setCelebrate((c) => c + 1) }} />
      </>
    )
  }

  return (
    <>
      <FloatingHearts />
      <Confetti trigger={celebrate} />
      <main>
        <Hero />
        <TwentyFive />
        <LoveLetter />
        <Reasons />
        <Timeline />
        <Gallery />
        <Cake onBlown={() => setCelebrate((c) => c + 1)} />
      </main>
      <footer>
        <p className="script">Forever & always,</p>
        <p className="signature">{MY_NAME} ❤ {HER_NAME}</p>
        <p className="couple-tag">#{COUPLE_NAME}</p>
      </footer>
    </>
  )
}
