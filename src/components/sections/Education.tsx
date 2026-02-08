'use client'

import { GraduationCap } from 'lucide-react'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { SECTION_IDS } from '@/lib/constants'

export default function Education() {
  return (
    <section id={SECTION_IDS.education} className="py-20 px-4 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-8 font-heading text-3xl font-bold text-text-primary md:text-4xl">
          Education
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <ScrollAnimation direction="up">
            <div className="flex items-center gap-4 rounded-xl border border-bg-tertiary bg-bg-secondary p-6">
              <GraduationCap className="h-8 w-8 flex-shrink-0 text-accent-cyan" />
              <div className="text-left">
                <p className="text-lg font-semibold text-text-primary">
                  Master&apos;s in CyberSecurity
                </p>
                <p className="text-sm text-text-secondary">
                  Queen&apos;s University Belfast
                </p>
                <p className="text-sm text-text-muted">2025 - Present</p>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.15}>
            <div className="flex items-center gap-4 rounded-xl border border-bg-tertiary bg-bg-secondary p-6">
              <GraduationCap className="h-8 w-8 flex-shrink-0 text-accent-cyan" />
              <div className="text-left">
                <p className="text-lg font-semibold text-text-primary">
                  Bachelor&apos;s of Engineering in Electronics and Mechanical Engineering
                </p>
                <p className="text-sm text-text-secondary">
                  National Institute of Technology, Ishikawa College (Japan)
                </p>
                <p className="text-sm text-text-muted">2018 - 2023</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
