'use client'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { TiltCard } from '../TiltCard'
import { Lightbox } from '../Lightbox'
import { Icon } from '../Icon'
import type { Photo } from '@/types'

const PLACEHOLDERS = ['#162820','#1a1a18','#181c18','#141e16']

export function PhotoTile({ photos }: { photos: Photo[] }) {
  const [hovering, setHovering] = useState(false)
  const [contactIndex, setContactIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null)
  const tileRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: tileRef, offset: ['start end','end start'] })
  const parallaxY = useTransform(scrollYProgress, [0,1], [-15,15])

  const hasPhotos = photos.some(p => p.url && !p.url.startsWith('/photos/'))

  useEffect(() => {
    if (hovering && photos.length > 1) {
      intervalRef.current = setInterval(() => setContactIndex(i => (i+1) % photos.length), 500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setContactIndex(0)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovering, photos.length])

  return (
    <>
      <TiltCard
        className="tile overflow-hidden relative cursor-pointer"
        style={{ gridColumn:'3 / 6', gridRow:'5 / 7' }}
        id="photos"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => setLightboxOpen(true)}
      >
        <div ref={tileRef} className="absolute inset-0 overflow-hidden">
          <motion.div style={{ y: parallaxY }} className="absolute inset-[-15px]">
            {hasPhotos ? (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-[2px]">
                {(hovering ? [photos[contactIndex], ...photos.filter((_,i) => i !== contactIndex).slice(0,3)] : photos.slice(0,4))
                  .map((p,i) => <div key={i} className="contact-photo-enter" style={{ backgroundImage:`url(${p.url})`, backgroundSize:'cover', backgroundPosition:'center' }} />)}
              </div>
            ) : (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-[2px]">
                {PLACEHOLDERS.map((c,i) => <div key={i} style={{ background:c }} />)}
              </div>
            )}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10" style={{ background:'rgba(0,0,0,0.62)' }}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Icon name="camera" size={10} style={{ color:'var(--accent-text)', opacity:0.9 }} />
            <p className="text-[10px] uppercase tracking-widest" style={{ color:'var(--accent-text)' }}>Photography</p>
          </div>
          <p className="text-[14px] font-medium text-white">
            Cheshire &amp; beyond
            {hovering && <span className="ml-2 text-[11px] opacity-60">click to open</span>}
          </p>
        </div>
      </TiltCard>

      <AnimatePresence>
        {lightboxOpen && hasPhotos && (
          <Lightbox
            photos={photos.filter(p => p.url && !p.url.startsWith('/photos/'))}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex(i => (i-1+photos.length) % photos.length)}
            onNext={() => setLightboxIndex(i => (i+1) % photos.length)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
