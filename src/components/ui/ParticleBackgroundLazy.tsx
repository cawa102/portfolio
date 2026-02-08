import dynamic from 'next/dynamic'

const ParticleBackgroundLazy = dynamic(
  () => import('@/components/ui/ParticleBackground'),
  { ssr: false }
)

export default ParticleBackgroundLazy
