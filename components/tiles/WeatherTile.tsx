import { SmallTile } from '../SmallTile'
import type { WeatherData } from '@/types'

interface WeatherTileProps { weather: WeatherData | null }

type WInfo = { emoji: string; desc: string; accent: string; border: string }

function getWeatherInfo(code: number, isDay: number): WInfo {
  if (code === 0)  return { emoji: isDay ? '☀️' : '🌙', desc: isDay ? 'Clear' : 'Clear night', accent: 'rgba(255,200,50,0.1)', border: 'rgba(255,200,50,0.2)' }
  if (code <= 3)   return { emoji: '⛅', desc: 'Partly cloudy', accent: 'rgba(160,180,220,0.1)', border: 'rgba(160,180,220,0.2)' }
  if (code <= 48)  return { emoji: '🌫', desc: 'Foggy',         accent: 'rgba(150,150,160,0.1)', border: 'rgba(150,150,160,0.2)' }
  if (code <= 57)  return { emoji: '🌦', desc: 'Drizzle',       accent: 'rgba(80,140,220,0.1)',  border: 'rgba(80,140,220,0.2)'  }
  if (code <= 67)  return { emoji: '🌧', desc: 'Rainy',         accent: 'rgba(60,120,200,0.12)', border: 'rgba(60,120,200,0.22)' }
  if (code <= 77)  return { emoji: '❄️', desc: 'Snowy',         accent: 'rgba(180,220,255,0.12)',border: 'rgba(180,220,255,0.25)' }
  if (code <= 82)  return { emoji: '🌦', desc: 'Showers',       accent: 'rgba(80,140,220,0.1)',  border: 'rgba(80,140,220,0.2)'  }
  return { emoji: '⛈', desc: 'Stormy', accent: 'rgba(100,60,180,0.12)', border: 'rgba(100,60,180,0.22)' }
}

export function WeatherTile({ weather }: WeatherTileProps) {
  const info = weather ? getWeatherInfo(weather.weathercode, weather.is_day) : { emoji: '🌡', desc: '—', accent: undefined, border: undefined }

  return (
    <SmallTile accentBg={info.accent ? `linear-gradient(160deg, ${info.accent} 0%, rgba(255,255,255,0.01) 100%)` : undefined} accentBorder={info.border}>
      <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Weather</p>
        <span style={{ fontSize: 32, lineHeight: 1 }}>{info.emoji}</span>
        {weather && (
          <p className="text-[22px] font-bold tabular-nums leading-none" style={{ color: 'var(--text)' }}>
            {Math.round(weather.temperature)}°
          </p>
        )}
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{info.desc}</p>
      </div>
    </SmallTile>
  )
}
