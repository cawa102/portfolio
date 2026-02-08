'use client'

import { ChevronDown } from 'lucide-react'
import ParticleBackgroundLazy from '@/components/ui/ParticleBackgroundLazy'
import TypingEffect from '@/components/ui/TypingEffect'
import { TYPING_CONFIG, SECTION_IDS } from '@/lib/constants'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <ParticleBackgroundLazy />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-6 font-heading text-5xl font-bold tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
          Hi, I&apos;m
          <br />
          Kyosuke Kawai
        </h1>

        <div className="mb-3 h-10 text-2xl text-text-secondary md:text-3xl">
          <TypingEffect
            phrases={TYPING_CONFIG.phrases}
            typingSpeed={TYPING_CONFIG.typingSpeed}
            deletingSpeed={TYPING_CONFIG.deletingSpeed}
            pauseAfterTyping={TYPING_CONFIG.pauseAfterTyping}
            pauseAfterDeleting={TYPING_CONFIG.pauseAfterDeleting}
          />
        </div>

        <p className="mb-10 text-lg text-text-muted md:text-xl">
          Master&apos;s Student in CyberSecurity — Based in UK
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <button
            type="button"
            onClick={() => scrollToSection(SECTION_IDS.projects)}
            className="rounded-lg bg-text-primary px-7 py-3 text-base font-medium text-bg-primary transition-colors hover:bg-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(SECTION_IDS.contact)}
            className="rounded-lg border border-text-muted px-7 py-3 text-base font-medium text-text-primary transition-colors hover:border-text-secondary hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 text-text-muted/40" />
      </div>
    </section>
  )
}
