'use client'

import { useRef } from 'react'
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 20 })
    animate(y, 0, { type: 'spring', stiffness: 200, damping: 20 })
    onMouseLeave?.()
  }

  const handleMouseEnter = () => {
    onMouseEnter?.()
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={tileVariants}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={clsx('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
