import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import type { WeatherData } from '@/types'

interface WeatherTileProps {
  weather: WeatherData | null
}

function getWeatherInfo(code: number, isDay: number) {
  if (code === 0)  return { emoji: isDay ? '☀️' : '🌙', desc: isDay ? 'Clear sky' : 'Clear night' }
  if (code <= 3)   return { emoji: '⛅', desc: 'Partly cloudy' }
  if (code <= 48)  return { emoji: '🌫', desc: 'Foggy' }
  if (code <= 57)  return { emoji: '🌦', desc: 'Drizzle' }
  if (code <= 67)  return { emoji: '🌧', desc: 'Rainy' }
  if (code <= 77)  return { emoji: '❄️', desc: 'Snowy' }
  if (code <= 82)  return { emoji: '🌦', desc: 'Showers' }
  if (code <= 86)  return { emoji: '🌨', desc: 'Snow showers' }
  return { emoji: '⛈', desc: 'Stormy' }
}

export function WeatherTile({ weather }: WeatherTileProps) {
  const info = weather
    ? getWeatherInfo(weather.weathercode, weather.is_day)
    : { emoji: '🌡', desc: '—' }

  return (
    <TiltCard className="tile col-span-1 p-5 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-1.5">
        <Icon name="pin" size={11} style={{ color: 'var(--text-subtle)' }} />
        <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
          Congleton
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-1 py-2">
        <span style={{ fontSize: '42px', lineHeight: 1 }}>{info.emoji}</span>
        {weather && (
          <p className="text-[28px] font-bold tabular-nums" style={{ color: 'var(--text)' }}>
            {Math.round(weather.temperature)}°C
          </p>
        )}
        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{info.desc}</p>
      </div>

      {weather && (
        <p className="text-[10px] text-center" style={{ color: 'var(--text-subtle)' }}>
          Wind {Math.round(weather.windspeed)} km/h
        </p>
      )}
    </TiltCard>
  )
}
