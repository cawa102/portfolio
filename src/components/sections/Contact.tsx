'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Github,
  Linkedin,
  BookOpen,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { CONTACT_LINKS } from '@/data/links'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

const ICON_MAP: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  BookOpen,
  Mail,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as const

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionOverlay id={SECTION_IDS.contact} sectionIndex={6} align="center">
      <div className="text-center">
        <h2 className="mb-3 font-display text-3xl font-bold text-cream-50 md:text-4xl">
          Get in Touch
        </h2>
        <p className="mb-10 text-white">
          Feel free to reach out for collaboration or opportunities
        </p>

        <motion.div
          className="flex items-center justify-center gap-5"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CONTACT_LINKS.map((link) => {
            const IconComponent = ICON_MAP[link.icon]
            if (!IconComponent) return null

            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${link.name}`}
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="text-shadow-none group flex h-12 w-12 items-center justify-center rounded-full border border-cream-200 bg-cream-50 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-golden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
              >
                <IconComponent className="h-5 w-5 text-warm-text-light transition-colors group-hover:text-warm-text" />
              </motion.a>
            )
          })}
        </motion.div>

        <p className="mt-12 text-xs text-white/80">
          &copy; 2026 Kyosuke Kawai
        </p>
      </div>
    </SectionOverlay>
  )
}
