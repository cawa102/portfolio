'use client'

import TypingEffect from '@/components/ui/TypingEffect'
import SectionOverlay from '@/components/world/SectionOverlay'
import { TYPING_CONFIG, SECTION_IDS } from '@/lib/constants'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <SectionOverlay id={SECTION_IDS.hero} sectionIndex={0} align="center">
      <div className="text-center">
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-warm-text sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m
          <br />
          Kyosuke Kawai
        </h1>

        <div className="mb-3 h-10 text-2xl text-warm-text-light md:text-3xl">
          <TypingEffect
            phrases={TYPING_CONFIG.phrases}
            typingSpeed={TYPING_CONFIG.typingSpeed}
            deletingSpeed={TYPING_CONFIG.deletingSpeed}
            pauseAfterTyping={TYPING_CONFIG.pauseAfterTyping}
            pauseAfterDeleting={TYPING_CONFIG.pauseAfterDeleting}
          />
        </div>

        <p className="mb-10 text-lg text-warm-text-light md:text-xl">
          Master&apos;s Student in CyberSecurity — Based in UK
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection(SECTION_IDS.projects)}
            className="rounded-full bg-warm-text px-7 py-3 text-base font-medium text-cream-50 shadow-soft transition-colors hover:bg-warm-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(SECTION_IDS.contact)}
            className="rounded-full border border-warm-text/30 bg-cream-50/60 px-7 py-3 text-base font-medium text-warm-text transition-colors hover:border-warm-text hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
          >
            Contact Me
          </button>
        </div>
      </div>
    </SectionOverlay>
  )
}
