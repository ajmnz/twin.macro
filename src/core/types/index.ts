import type { MacroParams } from 'babel-plugin-macros'
import type { NodePath, types as T } from '@babel/core'
import type * as P from 'postcss'
import type { Config as TailwindConfig } from 'tailwindcss'
import type chalk from 'chalk'
import type { color } from '../lib/logging'
import type userPresets from '../lib/userPresets'

// =========
// Utils

type KeyValuePair<K extends keyof never = string, V = string> = Record<K, V>

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/consistent-type-definitions
interface RecursiveKeyValuePair<K extends keyof never = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>
}
export type CssObject = RecursiveKeyValuePair<string, string | string[]>

// Make all properties in T optional
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// =========

export type ColorValue = (c: typeof color) => string

export type ColorType = keyof typeof color

export type PresetItem = { import: string; from: string }

export type PresetConfig = {
  styled: PresetItem
  css: PresetItem
  global: PresetItem
}

export type TwinConfigAll = {
  preset?: keyof typeof userPresets
  allowStyleProp: boolean
  autoCssProp: boolean
  dataTwProp: boolean | 'all'
  sassyPseudo: boolean
  debug: boolean
  includeClassNames: boolean
  dataCsProp: boolean | 'all'
  disableCsProp: boolean
  disableShortCss: boolean
  config?: string
  convertStyledDot?: boolean
  moveTwPropToStyled?: boolean
  convertHtmlElementToStyled?: boolean
  stitchesConfig?: undefined
} & PresetConfig

export type Candidate = [
  data: { layer: string },
  rule: P.Rule | P.AtRule | P.Declaration
]

export type TailwindContext = {
  candidateRuleMap: Array<[string, Candidate[]]>
  variantMap: Array<Record<string, never>>
}

export type MessageContext = {
  color: Record<ColorType, chalk.Chalk>
}

export type Assert = (
  expression: boolean | string,
  message: ({ color }: MessageContext) => string
) => void

export type CoreContext = {
  isDev: boolean
  assert: Assert
  debug: (reference: string, data: unknown, type?: ColorType) => void
  theme: (
    dotSeparatedItem: string,
    extra?: string
  ) => Record<string, unknown> | boolean | number
  tailwindContext: TailwindContext
  packageUsed: GetPackageUsed
  tailwindConfig: TailwindConfig
  twinConfig: TwinConfigAll
  CustomError: typeof Error
  importConfig: PresetConfig
  isShortCssOnly?: boolean
  isSilent?: boolean
  options?: TailwindMatchOptions
}

export type ExtractRuleStyles = {
  // assert: CoreContext['assert']
  // debug: CoreContext['debug']
  // theme: CoreContext['theme']
  // tailwindConfig: CoreContext['tailwindConfig']
  // tailwindContext: CoreContext['tailwindContext']
  sassyPseudo?: CoreContext['twinConfig']['sassyPseudo']
  // options?: CoreContext['options']
  includeUniversalStyles?: boolean
  hasImportant?: boolean
  selectorMatchReg?: RegExp
  passChecks?: boolean
} & Pick<
  CoreContext,
  | 'assert'
  | 'debug'
  | 'theme'
  | 'tailwindConfig'
  | 'tailwindContext'
  | 'options'
>

// export type ExtractRuleStyles = {
//   assert: CoreContext['assert']
//   debug: CoreContext['debug']
//   theme: CoreContext['theme']
//   tailwindConfig: CoreContext['tailwindConfig']
//   tailwindContext: CoreContext['tailwindContext']
//   sassyPseudo?: CoreContext['twinConfig']['sassyPseudo']
//   options?: CoreContext['options']
//   includeUniversalStyles?: boolean
//   hasImportant?: boolean
//   selectorMatchReg?: RegExp
//   passChecks?: boolean
// }

export type TransformDecl = {
  decl: P.Declaration
  property: string
} & ExtractRuleStyles

export type CreateCoreContext = {
  isDev: boolean
  config?: TwinConfig
  sourceRoot?: string
  filename?: string
  CustomError: typeof Error
}

export type PossiblePresets = keyof typeof userPresets

export type GetPackageUsed = {
  isEmotion: boolean
  isStyledComponents: boolean
  isGoober: boolean
  isStitches: boolean
}

export type TailwindMatchOptions = {
  preserveSource?: boolean
  respectPrefix?: boolean
  respectImportant?: boolean
  values?: Record<string, string>
}

export type TailwindMatch = [
  { options?: TailwindMatchOptions; layer?: string },
  P.Rule | P.AtRule | P.Declaration
]

export type GetConfigTwinValidatedParameters = GetPackageUsed & {
  isDev: boolean
}

export type TwinConfig = Partial<TwinConfigAll>

export type { T, NodePath, MacroParams, TailwindConfig, KeyValuePair }