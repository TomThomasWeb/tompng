'use client'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import clsx from 'clsx'
import { tileVariants } from './BentoGrid'

interface GrowCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function GrowCard({ children, className, style, id, onClick, onMouseEnter, onMouseLeave }: GrowCardProps) {
  const breatheScale = useMotionValue(1)
  const [breatheDelay] = useState<number>(() => Math.random() * 5)

  useEffect(() => {
    const c = animate(breatheScale, [1, 1.003, 1], {
      duration: 5, repeat: Infinity, ease: 'easeInOut', delay: breatheDelay,
    })
    return () => c.stop()
  }, [breatheDelay, breatheScale])

  return (
    <motion.div
      id={id}
      variants={tileVariants}
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ height: '100%', ...style }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
