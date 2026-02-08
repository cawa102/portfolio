'use client'

import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { SECTION_IDS } from '@/lib/constants'

export default function Blog() {
  return (
    <section id={SECTION_IDS.blog} className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-8 font-heading text-3xl font-bold text-text-primary md:text-4xl">
          Blog
        </h2>
        <ScrollAnimation direction="up">
          <p className="mb-8 text-text-secondary">
            I write about AI, security, and software engineering on Medium
          </p>
          <a
            href="https://medium.com/@ccawa102"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-accent-cyan px-6 py-3 text-accent-cyan transition-colors hover:bg-accent-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            Read on Medium &rarr;
          </a>
        </ScrollAnimation>
      </div>
    </section>
  )
}
