'use client'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import clsx from 'clsx'
import { tileVariants } from './BentoGrid'

interface StaticCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export function StaticCard({ children, className, style, id, onMouseEnter, onMouseLeave, onClick }: StaticCardProps) {
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
      style={{ scale: breatheScale, height: '100%', ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  )
}
