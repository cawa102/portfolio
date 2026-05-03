'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  const popVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring' as const,
            stiffness: 260,
            damping: 16,
            mass: 0.9,
          },
        },
      }

  return (
    <SectionOverlay id={SECTION_IDS.about} sectionIndex={1} align="left">
      <motion.div
        variants={popVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-45% 0px -45% 0px' }}
      >
        <h2 className="mb-6 font-display text-3xl font-bold text-cream-50 md:text-4xl">
          About Me
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-white md:text-lg">
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
      </motion.div>
    </SectionOverlay>
  )
}
