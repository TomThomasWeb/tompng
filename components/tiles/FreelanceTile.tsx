'use client'

import { useState, useEffect, useRef } from 'react'
import { TiltCard } from '../TiltCard'

interface FreelanceTileProps {
  freelance: {
    description: string
    services: string[]
    projects_count: number
    available: boolean
  }
}

function useCountUp(target: number) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1200
          const step = 16
          const increment = target / (duration / step)
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return { count, ref }
}

export function FreelanceTile({ freelance }: FreelanceTileProps) {
  const { count, ref } = useCountUp(freelance.projects_count)

  return (
    <TiltCard className="tile col-span-2 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
              Tom Thomas
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
              Web &amp; Media
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {freelance.available && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full border"
                style={{
                  color: 'var(--accent-text)',
                  background: 'var(--accent-bg)',
                  borderColor: 'var(--accent-border)',
                }}
              >
                Available
              </span>
            )}
            <div ref={ref} className="text-right">
              <span className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
                {count}
              </span>
              <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>
                projects
              </p>
            </div>
          </div>
        </div>

        <p
          className="text-[12px] leading-relaxed mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          {freelance.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {freelance.services.map((service) => (
          <span
            key={service}
            className="text-[10px] px-2 py-1 rounded-full border"
            style={{
              color: 'var(--text-subtle)',
              background: 'var(--divider)',
              borderColor: 'var(--border)',
            }}
          >
            {service}
          </span>
        ))}
        <a
          href="https://tomthomas.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] px-2 py-1 rounded-full border hover:opacity-80 transition-opacity"
          style={{
            color: 'var(--accent-text)',
            background: 'var(--accent-bg)',
            borderColor: 'var(--accent-border)',
          }}
        >
          tomthomas.uk →
        </a>
      </div>
    </TiltCard>
  )
}
