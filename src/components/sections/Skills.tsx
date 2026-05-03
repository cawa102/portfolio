'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SKILL_CATEGORIES } from '@/data/skills'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

function MarqueeRow({
  skills,
  direction,
  speed,
}: {
  readonly skills: readonly string[]
  readonly direction: 'left' | 'right'
  readonly speed: number
}) {
  const items = [...skills, ...skills]
  const animationClass =
    direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="marquee-container relative overflow-hidden py-2">
      <div
        className={`flex w-max gap-3 ${animationClass}`}
        style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="whitespace-nowrap rounded-full border border-cream-200 bg-cream-50 px-4 py-2 text-sm font-medium text-warm-text shadow-sm transition-colors duration-200 hover:border-golden/50 hover:bg-noon/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  const allRows = SKILL_CATEGORIES.map((cat, i) => ({
    label: cat.name,
    skills: cat.skills,
    direction: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
    speed: 20 + i * 3,
  }))

  return (
    <SectionOverlay id={SECTION_IDS.skills} sectionIndex={3} align="left">
      <motion.h2
        className="mb-8 font-display text-3xl font-bold text-warm-text md:text-4xl"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills &amp; Technologies
      </motion.h2>

      <div className="space-y-5">
        {allRows.map((row) => (
          <motion.div
            key={row.label}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-warm-text-light">
              {row.label}
            </p>
            <MarqueeRow
              skills={row.skills}
              direction={row.direction}
              speed={row.speed}
            />
          </motion.div>
        ))}
      </div>
    </SectionOverlay>
  )
}
