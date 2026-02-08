'use client'

import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { SECTION_IDS } from '@/lib/constants'

export default function About() {
  return (
    <section id={SECTION_IDS.about} className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-8 font-heading text-3xl font-bold text-text-primary md:text-4xl">
          About Me
        </h2>
        <ScrollAnimation direction="up">
          <div className="mx-auto max-w-3xl space-y-4 text-lg leading-relaxed text-text-secondary">
            <p>
              I&apos;m a CyberSecurity Master&apos;s student based in the UK. Over
              the past year, I have intensively built real-world AI-driven
              applications as production-minded systems addressing genuine problems and emerging trends.
            </p>
            <p>
              My focus is on maximising the power of AI agents to accelerate
              development while ensuring the security that must come with it. In
              an era where AI capabilities are advancing faster than the
              safeguards around them, I am working to become the kind of engineer
              who can build boldly and build safely.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
