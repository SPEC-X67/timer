import { useEffect, useMemo, useState } from 'react'

const ONE_SECOND_MS = 1000
const ONE_MINUTE_MS = 60 * ONE_SECOND_MS
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS

function formatTime(msRemaining: number): string {
  if (msRemaining <= 0) {
    return '00:00:00'
  }
  const totalHours = Math.floor(msRemaining / ONE_HOUR_MS)
  const minutes = Math.floor((msRemaining % ONE_HOUR_MS) / ONE_MINUTE_MS)
  const seconds = Math.floor((msRemaining % ONE_MINUTE_MS) / ONE_SECOND_MS)

  const hh = String(totalHours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

export default function App() {
  const [now, setNow] = useState<number>(() => Date.now())
  const [endTime] = useState<number>(() => 1762516759396)

  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const msRemaining = useMemo(() => {
    return Math.max(0, endTime - now)
  }, [now, endTime])

  const timeText = useMemo(() => formatTime(msRemaining), [msRemaining])

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      color: '#dc2626',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      width: '100%',
      padding: '4vw',
      boxSizing: 'border-box',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            // Responsive: min 3rem, fluid up to 12vw, max 10rem
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            fontVariantNumeric: 'tabular-nums',
            color: '#ef4444',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
          }}
        >
          {timeText}
        </div>
        <div
          style={{
            marginTop: 'min(2vh, 24px)',
            maxWidth: 'min(90ch, 92vw)',
            lineHeight: 1.45,
            // Responsive subtitle size
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            fontWeight: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            wordBreak: 'break-word',
            color: '#dc2626',
          }}
        >
          Pay amount as soon as possible. Failed to pay, it's going to automatically delete your project and database.
        </div>
      </div>
    </div>
  )
}


