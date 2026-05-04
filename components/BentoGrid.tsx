'use client'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
}

export const tileVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] } },
}

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 bento-fill"
      style={{ gridAutoRows: 'minmax(100px, auto)', perspective: '1200px' }}
    >
      {children}
    </motion.div>
  )
}
