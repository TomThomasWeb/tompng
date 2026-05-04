// Minimal stroke-based SVG icons, 16×16 viewBox
// Use size prop to scale; colour inherits from currentColor

export type IconName =
  | 'camera'
  | 'gamepad'
  | 'vinyl'
  | 'clock'
  | 'wrench'
  | 'pen'
  | 'book'
  | 'code'
  | 'music'
  | 'pin'
  | 'briefcase'

interface IconProps {
  name: IconName
  size?: number
  style?: React.CSSProperties
  className?: string
}

const S = {
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
}

export function Icon({ name, size = 12, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      className={className}
      aria-hidden="true"
    >
      {name === 'camera' && (
        <>
          <rect x="1.5" y="5" width="13" height="9" rx="1.5" {...S} />
          <circle cx="8" cy="9.5" r="2.5" {...S} />
          <path d="M5.5 5V4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v1" {...S} />
          <circle cx="12" cy="7" r=".5" fill="currentColor" />
        </>
      )}
      {name === 'gamepad' && (
        <>
          <rect x="1.5" y="5.5" width="13" height="7" rx="2" {...S} />
          <path d="M5 9h2M6 8v2" {...S} />
          <circle cx="10.5" cy="8.5" r=".75" fill="currentColor" />
          <circle cx="12" cy="10" r=".75" fill="currentColor" />
        </>
      )}
      {name === 'vinyl' && (
        <>
          <circle cx="8" cy="8" r="6" {...S} />
          <circle cx="8" cy="8" r="3" {...S} />
          <circle cx="8" cy="8" r="1" fill="currentColor" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="8" cy="8" r="6" {...S} />
          <path d="M8 4.5V8l2.5 1.5" {...S} />
        </>
      )}
      {name === 'wrench' && (
        <>
          <path
            d="M10.5 2a3 3 0 00-2.83 4L2.5 11.2a1.5 1.5 0 102.3 2L9.9 8a3 3 0 003.6-3.83L11.7 5.9l-1.4-1.4 1.73-1.83A3 3 0 0010.5 2z"
            {...S}
          />
        </>
      )}
      {name === 'pen' && (
        <>
          <path d="M12 2l2 2-9 9H3v-2L12 2z" {...S} />
          <path d="M10 4l2 2" {...S} />
        </>
      )}
      {name === 'book' && (
        <>
          <path d="M3 3h4a1 1 0 011 1v9a1 1 0 00-1-1H3V3z" {...S} />
          <path d="M13 3H9a1 1 0 00-1 1v9a1 1 0 011-1h4V3z" {...S} />
        </>
      )}
      {name === 'code' && (
        <>
          <path d="M5 5L2 8l3 3M11 5l3 3-3 3M9 4l-2 8" {...S} />
        </>
      )}
      {name === 'music' && (
        <>
          <path d="M6 11.5V3l7-1.5v2L6 5" {...S} />
          <circle cx="4.5" cy="11.5" r="1.5" {...S} />
          <circle cx="11.5" cy="10" r="1.5" {...S} />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M8 2a4 4 0 014 4c0 3-4 8-4 8S4 9 4 6a4 4 0 014-4z" {...S} />
          <circle cx="8" cy="6" r="1.5" {...S} />
        </>
      )}
      {name === 'briefcase' && (
        <>
          <rect x="2" y="6" width="12" height="8" rx="1.5" {...S} />
          <path d="M5.5 6V4.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V6" {...S} />
          <path d="M2 10h12" {...S} />
        </>
      )}
    </svg>
  )
}
