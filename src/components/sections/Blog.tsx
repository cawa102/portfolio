'use client'

import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

export default function Blog() {
  return (
    <SectionOverlay id={SECTION_IDS.blog} sectionIndex={5} align="left">
      <h2 className="mb-4 font-display text-3xl font-bold text-cream-50 md:text-4xl">
        Blog
      </h2>
      <p className="mb-6 text-white">
        I write about AI, security, and software engineering on Medium
      </p>
      <a
        href="https://medium.com/@ccawa102"
        target="_blank"
        rel="noopener noreferrer"
        className="text-shadow-none inline-flex items-center gap-2 rounded-full border border-warm-text/30 bg-cream-50 px-6 py-3 font-medium text-warm-text shadow-sm transition-colors hover:border-golden hover:bg-noon/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
      >
        Read on Medium &rarr;
      </a>
    </SectionOverlay>
  )
}
