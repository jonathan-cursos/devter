import { useEffect, useState } from 'react'

const DATE_UNITS = [
  // A cuanto equivale cada unidad en segundos
  // Lo hacemos con un nombre, porque vamos a usar el nombre en el frontend
  ['day', 15400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000 // diferencia entre hora actual y hora del devit, lo pasamos a segundos, porque en el array usamos segundos
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAge(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeAgo(newTimeAgo)
    }, 5000)
    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat('es', {
    style: 'short'
  })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
