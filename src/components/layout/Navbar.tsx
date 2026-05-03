'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SECTION_IDS } from '@/lib/constants'
import { useWorldScroll } from '@/lib/useWorldScroll'

const SECTION_ORDER: readonly string[] = [
  SECTION_IDS.hero,
  SECTION_IDS.about,
  SECTION_IDS.projects,
  SECTION_IDS.skills,
  SECTION_IDS.education,
  SECTION_IDS.blog,
  SECTION_IDS.contact,
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { sectionIndex } = useWorldScroll()
  const activeSection = SECTION_ORDER[sectionIndex] ?? ''

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      setIsMobileOpen(false)
    },
    []
  )

  return (
    <nav
      className={`sticky top-0 z-50 h-16 transition-colors duration-300 ${
        isScrolled
          ? 'bg-cream-50/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-display text-base font-semibold tracking-tight text-warm-text"
        >
          Kyosuke Kawai
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden ${
                  isActive
                    ? 'text-warm-text after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:mx-auto after:h-0.5 after:w-6 after:rounded-full after:bg-golden'
                    : 'text-warm-text-light hover:text-warm-text'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="text-warm-text-light hover:text-warm-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden md:hidden"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-b border-cream-200 bg-cream-50/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden ${
                    isActive
                      ? 'bg-noon/40 text-warm-text'
                      : 'text-warm-text-light hover:bg-cream-100 hover:text-warm-text'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
