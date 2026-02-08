'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SKILL_CATEGORIES } from '@/data/skills'
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
        className={`flex w-max gap-4 ${animationClass}`}
        style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="whitespace-nowrap rounded-full border border-bg-tertiary bg-bg-secondary px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-text-muted/40 hover:text-text-primary"
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
    <section id={SECTION_IDS.skills} className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-14 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills &amp; Technologies
        </motion.h2>

        <div className="space-y-6">
          {allRows.map((row) => (
            <motion.div
              key={row.label}
              initial={shouldReduceMotion ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-text-muted">
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
      </div>
    </section>
  )
}
