'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Photo } from '@/types'

interface LightboxProps {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[currentIndex]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(6, 6, 6, 0.96)' }}
      onClick={onClose}
    >
      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none" />

      {/* Close */}
      <button
        className="absolute top-5 right-5 text-[22px] z-10 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text)' }}
        onClick={onClose}
      >
        ×
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-5 text-[12px] z-10 opacity-40"
        style={{ color: 'var(--text)' }}
      >
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev arrow */}
      <button
        className="absolute left-5 text-[28px] opacity-30 hover:opacity-80 transition-opacity z-10 select-none"
        style={{ color: 'var(--text)' }}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
      >
        ←
      </button>

      {/* Photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="relative max-w-[85vw] max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.caption}
            className="max-w-full max-h-[75vh] object-contain rounded-lg"
          />
          {(photo.caption || photo.location) && (
            <div className="mt-3 text-center">
              {photo.caption && (
                <p className="text-[13px]" style={{ color: 'var(--text)' }}>{photo.caption}</p>
              )}
              {photo.location && (
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>{photo.location}</p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next arrow */}
      <button
        className="absolute right-5 text-[28px] opacity-30 hover:opacity-80 transition-opacity z-10 select-none"
        style={{ color: 'var(--text)' }}
        onClick={(e) => { e.stopPropagation(); onNext() }}
      >
        →
      </button>
    </motion.div>
  )
}
