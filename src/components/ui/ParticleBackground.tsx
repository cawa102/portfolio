'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setEngineReady(true)
    })
  }, [])

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          color: { value: '#00d4ff' },
          links: {
            enable: true,
            color: '#00d4ff',
            opacity: 0.2,
            distance: 150,
          },
          move: {
            enable: true,
            speed: { min: 0.5, max: 1 },
            direction: 'none',
            random: true,
            outModes: { default: 'out' },
          },
          number: {
            value: 60,
            density: { enable: true },
          },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 100 },
          },
        },
      }}
    />
  )
}
