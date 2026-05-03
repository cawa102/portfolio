'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  readonly project: Project
}

const statusStyles = {
  Release: 'bg-noon/40 text-warm-text border border-golden/40',
  Beta: 'bg-magic-hour/30 text-warm-text border border-magic-hour/40',
} as const

export default function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-cream-200 bg-cream-50 p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-golden/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-warm-text">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
        >
          {project.version} {project.status}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-warm-text-light">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-warm-text-light"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
