import { SmallTile } from '../SmallTile'
import type { WeatherData } from '@/types'

function getInfo(code: number, isDay: number) {
  if (code === 0)  return { emoji: isDay?'☀️':'🌙', desc:isDay?'Clear':'Clear night', bg:'rgba(255,200,50,0.1)',  border:'rgba(255,200,50,0.2)'  }
  if (code <= 3)   return { emoji:'⛅', desc:'Partly cloudy', bg:'rgba(160,180,220,0.1)', border:'rgba(160,180,220,0.2)' }
  if (code <= 48)  return { emoji:'🌫', desc:'Foggy',         bg:'rgba(150,150,160,0.1)', border:'rgba(150,150,160,0.2)' }
  if (code <= 67)  return { emoji:'🌧', desc:'Rainy',         bg:'rgba(60,120,200,0.12)', border:'rgba(60,120,200,0.22)' }
  if (code <= 77)  return { emoji:'❄️', desc:'Snowy',         bg:'rgba(180,220,255,0.12)',border:'rgba(180,220,255,0.25)' }
  return { emoji:'⛈', desc:'Stormy', bg:'rgba(100,60,180,0.12)', border:'rgba(100,60,180,0.22)' }
}

export function WeatherTile({ weather }: { weather: WeatherData | null }) {
  const info = weather ? getInfo(weather.weathercode, weather.is_day) : { emoji:'🌡', desc:'—', bg:undefined, border:undefined }
  return (
    <SmallTile gridColumn="4 / 5" gridRow="4 / 5"
      accentBg={info.bg ? `linear-gradient(160deg, ${info.bg} 0%, rgba(255,255,255,0.01) 100%)` : undefined}
      accentBorder={info.border}>
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <span style={{ fontSize:30, lineHeight:1 }}>{info.emoji}</span>
        {weather && <p className="text-[20px] font-bold tabular-nums leading-none" style={{ color:'var(--text)' }}>{Math.round(weather.temperature)}°</p>}
        <p className="text-[10px]" style={{ color:'var(--text-muted)' }}>{info.desc}</p>
      </div>
    </SmallTile>
  )
}
