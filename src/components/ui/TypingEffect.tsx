'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface TypingEffectProps {
  readonly phrases: readonly string[]
  readonly typingSpeed?: number
  readonly deletingSpeed?: number
  readonly pauseAfterTyping?: number
  readonly pauseAfterDeleting?: number
}

export default function TypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseAfterTyping = 2000,
  pauseAfterDeleting = 500,
}: TypingEffectProps) {
  const shouldReduceMotion = useReducedMotion()
  const [currentText, setCurrentText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) return

    const currentPhrase = phrases[phraseIndex]

    if (isPaused) {
      const pauseDuration = isDeleting ? pauseAfterDeleting : pauseAfterTyping
      const timer = setTimeout(() => {
        setIsPaused(false)
        if (!isDeleting) {
          setIsDeleting(true)
        } else {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }, pauseDuration)
      return () => clearTimeout(timer)
    }

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timer)
      }
      setIsPaused(true)
    } else {
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timer)
      }
      setIsPaused(true)
    }
  }, [
    currentText,
    isDeleting,
    isPaused,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
    shouldReduceMotion,
  ])

  if (shouldReduceMotion) {
    return <span>{phrases[0]}</span>
  }

  return (
    <span>
      {currentText}
      <span className="animate-blink" aria-hidden="true">
        |
      </span>
    </span>
  )
}
