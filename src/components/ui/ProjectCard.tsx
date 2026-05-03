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
      className="text-shadow-none flex h-full flex-col rounded-2xl border border-cream-200 bg-cream-50 p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-golden/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold leading-tight text-warm-text">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[project.status]}`}
        >
          {project.version} {project.status}
        </span>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-warm-text-light">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] text-warm-text-light"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
