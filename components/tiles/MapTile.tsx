import { TiltCard } from '../TiltCard'

const MAP_TILE = 'https://tile.openstreetmap.org/13/4046/2662.png'

export function MapTile() {
  return (
    <TiltCard className="tile col-span-1 overflow-hidden relative cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MAP_TILE}
        alt="Congleton map"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'var(--map-filter, grayscale(0.4) brightness(0.6) saturate(0.7))' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.28)' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span style={{ fontSize: 16 }}>📍</span>
        <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          Congleton
        </p>
      </div>
      <a
        href="https://www.openstreetmap.org/?mlat=53.1635&mlon=-2.2160"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label="Open Congleton on map"
      />
    </TiltCard>
  )
}
