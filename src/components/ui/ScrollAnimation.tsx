'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ScrollAnimationProps {
  readonly children: ReactNode
  readonly direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  readonly delay?: number
  readonly duration?: number
  readonly className?: string
}

const directionOffsets = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
} as const

export default function ScrollAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  const offset = directionOffsets[direction]

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
