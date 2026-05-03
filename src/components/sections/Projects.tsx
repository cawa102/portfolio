'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionOverlay
      id={SECTION_IDS.projects}
      sectionIndex={2}
      align="center"
      widthClass="max-w-6xl"
    >
      <h2 className="mb-3 text-center font-display text-3xl font-bold text-cream-50 md:text-4xl">
        Projects
      </h2>
      <p className="mb-8 text-center text-white">
        Open-source tools built at the intersection of AI and security
      </p>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.title}
            className="h-full"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionOverlay>
  )
}
