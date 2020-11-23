import timSort from 'timsort'
import { get } from './utils'

const stringifyScreen = (config, screenName) => {
  const screen = get(config, ['theme', 'screens', screenName])
  if (typeof screen === 'undefined') {
    throw new Error(
      `Couldn’t find Tailwind the screen "${screenName}" in the Tailwind config`
    )
  }

  if (typeof screen === 'string') return `@media (min-width: ${screen})`
  if (typeof screen.raw === 'string') {
    return `@media ${screen.raw}`
  }

  const string = (Array.isArray(screen) ? screen : [screen])
    .map(range => {
      return [
        typeof range.min === 'string' ? `(min-width: ${range.min})` : null,
        typeof range.max === 'string' ? `(max-width: ${range.max})` : null,
      ]
        .filter(Boolean)
        .join(' and ')
    })
    .join(', ')
  return string ? `@media ${string}` : ''
}

const orderByScreens = (className, state) => {
  const classNames = className.match(/\S+/g) || []
  const screens = Object.keys(state.config.theme.screens)

  const screenCompare = (a, b) => {
    const A = a.includes(':') ? a.split(':')[0] : a
    const B = b.includes(':') ? b.split(':')[0] : b
    return screens.indexOf(A) < screens.indexOf(B) ? -1 : 1
  }

  // Tim Sort provides accurate sorting in node < 11
  // https://github.com/ben-rogerson/twin.macro/issues/20
  timSort.sort(classNames, screenCompare)
  return classNames
}

export { stringifyScreen, orderByScreens }
