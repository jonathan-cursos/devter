// Esto nos permite que, al hacer un hover sobre la fecha, nos muestre una tarjeta con esta fecha
// En nuestro caso no funciona, porque no traemos el cambio hecho por el estudiante, solo este hook

import { DEFAULT_LANGUAGE } from 'constants/locale'

const isDateTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.DateTimeFormat

export const formDate = (timestamp, { language = DEFAULT_LANGUAGE }) => {
  const date = new Date(timestamp)

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return date.toLocaleDateString(language, options)
  }
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateTimeFormat(timestamp) {
  return formDate(timestamp, { language: DEFAULT_LANGUAGE })
}
