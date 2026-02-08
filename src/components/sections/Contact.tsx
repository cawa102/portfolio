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
    <section id={SECTION_IDS.contact} className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-text-primary md:text-4xl">
          Get in Touch
        </h2>
        <p className="mb-12 text-text-secondary">
          Feel free to reach out for collaboration or opportunities
        </p>

        <motion.div
          className="flex items-center justify-center gap-6"
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
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-bg-tertiary bg-bg-secondary transition-all hover:scale-110 hover:border-accent-cyan/40 hover:bg-accent-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <IconComponent className="h-5 w-5 text-text-secondary transition-colors group-hover:text-accent-cyan" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
