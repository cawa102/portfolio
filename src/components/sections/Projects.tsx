'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
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
    <section id={SECTION_IDS.projects} className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-text-primary md:text-4xl">
          Projects
        </h2>
        <p className="mb-12 text-center text-text-secondary">
          Open-source tools built at the intersection of AI and security
        </p>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
