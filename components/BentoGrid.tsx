'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.1,
    },
  },
}

export const tileVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
}

interface BentoGridProps {
  children: React.ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
      style={{
        gridAutoRows: 'minmax(200px, auto)',
        perspective: '1200px',
      }}
    >
      {children}
    </motion.div>
  )
}
