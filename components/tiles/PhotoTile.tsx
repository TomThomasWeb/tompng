'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TiltCard } from '../TiltCard'
import { Lightbox } from '../Lightbox'
import type { Photo } from '@/types'

interface PhotoTileProps {
  photos: Photo[]
}

// Placeholder colours shown before real photos are uploaded
const PLACEHOLDER_COLORS = ['#162820', '#1a1a18', '#181c18', '#141e16']

export function PhotoTile({ photos }: PhotoTileProps) {
  const [hovering, setHovering] = useState(false)
  const [contactIndex, setContactIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hasPhotos = photos.some((p) => p.url && !p.url.startsWith('/photos/'))

  useEffect(() => {
    if (hovering && photos.length > 1) {
      intervalRef.current = setInterval(() => {
        setContactIndex((i) => (i + 1) % photos.length)
      }, 500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setContactIndex(0)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovering, photos.length])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <TiltCard
        className="tile col-span-2 row-span-2 overflow-hidden relative cursor-pointer min-h-[310px]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => openLightbox(contactIndex)}
      >
        {/* Photo grid / placeholders */}
        {hasPhotos ? (
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px]">
            {(hovering ? [photos[contactIndex], ...photos.filter((_, i) => i !== contactIndex).slice(0, 3)] : photos.slice(0, 4)).map((photo, i) => (
              <div
                key={i}
                className="overflow-hidden contact-photo-enter"
                style={{ backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[3px]">
            {PLACEHOLDER_COLORS.map((color, i) => (
              <div key={i} style={{ background: color }} />
            ))}
          </div>
        )}

        {/* Label */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--accent-text)' }}>
            Photography
          </p>
          <p className="text-[13px] font-medium text-white">
            Cheshire &amp; beyond
            {hovering && <span className="ml-2 text-[10px] opacity-60">click to open</span>}
          </p>
        </div>
      </TiltCard>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            photos={photos.filter((p) => p.url && !p.url.startsWith('/photos/'))}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)}
            onNext={() => setLightboxIndex((i) => (i + 1) % photos.length)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
