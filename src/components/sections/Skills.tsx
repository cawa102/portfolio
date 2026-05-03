'use client'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SKILL_CATEGORIES } from '@/data/skills'
import { SECTION_IDS } from '@/lib/constants'

// Character (the boy in the workshop) sits roughly at viewport (57%, 41%) with
// a body bounding box of x ∈ [50, 63], y ∈ [37, 90]. The grid below forms a
// halo around him without covering his body or the title at top-left.
const CHARACTER_X = 57
const CHARACTER_Y = 41

const GRID_CELLS = [
  { left: 45, top: 24 }, // upper-left of head (over pegboard)
  { left: 58, top: 16 }, // directly above head (high up)
  { left: 68, top: 20 }, // upper-right of head
  { left: 74, top: 38 }, // right of shoulder
  { left: 71, top: 55 }, // right of waist (above storage drawers)
  { left: 45, top: 55 }, // left of waist (above workbench)
  { left: 38, top: 38 }, // left of shoulder (above tools)
  { left: 64, top: 70 }, // lower-right (above drawer top)
] as const

const BUBBLE_PALETTE = [
  { bg: 'bg-cream-50', border: 'border-cream-200' },
  { bg: 'bg-noon', border: 'border-golden/40' },
  { bg: 'bg-cream-100', border: 'border-cream-200' },
  { bg: 'bg-[#fde0b8]', border: 'border-golden/30' },
] as const

type Palette = (typeof BUBBLE_PALETTE)[number]
type TailCorner = 'bl' | 'br' | 'tl' | 'tr'

type BubblePosition = {
  readonly skill: string
  readonly left: number
  readonly top: number
  readonly rotation: number
  readonly tail: TailCorner
  readonly palette: Palette
}

const CYCLE_MS = 2800

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickPositions(skills: readonly string[]): BubblePosition[] {
  const cells = shuffle(GRID_CELLS).slice(0, skills.length)
  const palettes = shuffle(BUBBLE_PALETTE)
  return skills.map((skill, i) => {
    const cell = cells[i] ?? GRID_CELLS[i % GRID_CELLS.length]
    const tailHor: 'l' | 'r' = cell.left < CHARACTER_X ? 'r' : 'l'
    const tailVer: 't' | 'b' = cell.top < CHARACTER_Y ? 'b' : 't'
    return {
      skill,
      left: cell.left + (Math.random() - 0.5) * 3,
      top: cell.top + (Math.random() - 0.5) * 3,
      rotation: (Math.random() - 0.5) * 7,
      tail: `${tailVer}${tailHor}` as TailCorner,
      palette: palettes[i % palettes.length],
    }
  })
}

const TAIL_POS: Record<TailCorner, string> = {
  bl: 'bottom-0 left-6 translate-y-1/2',
  br: 'bottom-0 right-6 translate-y-1/2',
  tl: 'top-0 left-6 -translate-y-1/2',
  tr: 'top-0 right-6 -translate-y-1/2',
}

function SkillBubble({
  pos,
  delay,
}: {
  readonly pos: BubblePosition
  readonly delay: number
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: pos.rotation - 6 }}
        animate={{ opacity: 1, scale: 1, rotate: pos.rotation }}
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.3, ease: 'easeIn' },
        }}
        transition={{
          delay,
          type: 'spring',
          stiffness: 280,
          damping: 14,
          mass: 0.8,
        }}
        className="relative inline-block"
      >
        <div
          aria-hidden
          className={`absolute h-3.5 w-3.5 rotate-45 border-2 ${pos.palette.border} ${pos.palette.bg} ${TAIL_POS[pos.tail]}`}
        />
        <div
          className={`relative max-w-[12rem] rounded-[1.4rem] border-2 ${pos.palette.border} ${pos.palette.bg} px-4 py-2 shadow-[0_12px_28px_-10px_rgba(58,42,31,0.55)] sm:px-5 sm:py-2.5`}
        >
          <span className="text-shadow-none block text-center font-display text-sm font-semibold leading-tight tracking-tight text-warm-text sm:text-base md:text-lg">
            {pos.skill}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

function StaticSkillsList() {
  const allSkills = SKILL_CATEGORIES.flatMap((cat) => cat.skills)
  return (
    <div className="flex flex-wrap gap-3">
      {allSkills.map((skill) => (
        <span
          key={skill}
          className="text-shadow-none rounded-full border border-cream-200 bg-cream-50 px-4 py-2 text-sm font-medium text-warm-text shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  )
  const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  const shouldReduceMotion = useReducedMotion()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [positions, setPositions] = useState<readonly BubblePosition[]>([])

  useEffect(() => {
    if (shouldReduceMotion) return
    const cat = SKILL_CATEGORIES[categoryIndex]
    setPositions(pickPositions(cat.skills))
  }, [categoryIndex, shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setTimeout(() => {
      setCategoryIndex((i) => (i + 1) % SKILL_CATEGORIES.length)
    }, CYCLE_MS)
    return () => clearTimeout(id)
  }, [categoryIndex, shouldReduceMotion])

  const useBubbles = !shouldReduceMotion

  return (
    <section
      ref={ref}
      id={SECTION_IDS.skills}
      data-section-index={3}
      className="relative min-h-screen w-full"
    >
      {/* Mobile + reduced-motion fallback: title + static list, normal flow */}
      <div
        className={`flex min-h-screen flex-col px-6 pt-32 pb-20 ${useBubbles ? 'sm:hidden' : ''}`}
      >
        <motion.div
          style={{ opacity, y: yOffset }}
          className="text-readable"
        >
          <motion.h2
            className="mb-8 font-display text-3xl font-bold text-cream-50 md:text-4xl"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Skills &amp; Technologies
          </motion.h2>
          <StaticSkillsList />
        </motion.div>
      </div>

      {/* Desktop: title at top-left + bubble overlay around character */}
      {useBubbles && (
        <div className="hidden sm:block">
          <motion.div
            style={{ opacity, y: yOffset }}
            className="text-readable absolute left-12 top-[24vh] z-20 lg:left-24"
          >
            <motion.h2
              className="font-display text-3xl font-bold text-cream-50 md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Skills &amp; Technologies
            </motion.h2>
          </motion.div>

          <motion.div
            aria-hidden
            style={{ opacity }}
            className="pointer-events-none absolute inset-0 z-10"
          >
            <AnimatePresence mode="wait">
              <motion.div key={categoryIndex} className="absolute inset-0">
                {positions.map((pos, i) => (
                  <SkillBubble
                    key={`${categoryIndex}-${pos.skill}`}
                    pos={pos}
                    delay={i * 0.12}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <ul className="sr-only">
        {SKILL_CATEGORIES.map((cat) => (
          <li key={cat.name}>
            {cat.name}: {cat.skills.join(', ')}
          </li>
        ))}
      </ul>
    </section>
  )
}
