export default properties => {
  const {
    theme,
    match,
    getConfigValue,
    errors: { errorSuggestions },
  } = properties

  const classValue = match(/(?<=(drop-shadow)-)([^]*)/)
  const configValue = config => getConfigValue(theme(config), classValue)

  const value = configValue('dropShadow')
  if (!value) {
    errorSuggestions({ config: ['dropShadow'] })
  }

  const dropShadowValue = Array.isArray(value)
    ? value.map(v => `drop-shadow(${v})`).join(' ')
    : `drop-shadow(${value})`

  return { '--tw-drop-shadow': dropShadowValue }
}
