'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import clsx from 'clsx'
import { tileVariants } from './BentoGrid'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export function TiltCard({ children, className, style, id, onMouseEnter, onMouseLeave, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  // Stable random delay per tile — runs once on mount, client-only
  const [breatheDelay] = useState(() => Math.random() * 5)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 20 })
    animate(y, 0, { type: 'spring', stiffness: 200, damping: 20 })
    onMouseLeave?.()
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={tileVariants}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={clsx('will-change-transform', className)}
    >
      {/* Breathing inner wrapper — separate element so tilt transforms don't conflict */}
      <motion.div
        animate={{ scale: [1, 1.003, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: breatheDelay,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
