import type {
  BuiltinLanguage,
  BuiltinTheme,
  BundledLanguage,
  Highlighter,
  LanguageInput,
  ShikiTransformer,
  ThemeRegistrationAny,
} from 'shiki'
import type { Awaitable } from './utils/types'
import { createHighlighter as createShikiHighlighter } from 'shiki'

export type ThemeOptions =
  | ThemeRegistrationAny
  | BuiltinTheme
  | {
      light: ThemeRegistrationAny | BuiltinTheme
      dark: ThemeRegistrationAny | BuiltinTheme
    }

export type HighlighterHooks = (hl: Highlighter) => Awaitable<void>

export interface CreateHighlighterOptions {
  /**
   * Configure shiki theme.
   *
   * @example { theme: 'github-dark' }
   * @example { theme: { light: 'github-light', dark: 'github-dark' } }
   */
  theme: ThemeOptions
  /**
   * Custom syntax highlighter language or preload built-in languages.
   */
  languages: (LanguageInput | BuiltinLanguage)[]
  /**
   * Configure fallback language when the language not available.
   * Make sure to add the specified language to language list options,
   * so the fallback language is loaded.
   * @default 'txt'
   *
   * @example { languages: ['txt', ...], defaultLang: 'txt' }
   */
  defaultLang?: string
  /**
   * Configure shiki instance.
   */
  shikiConfig?: HighlighterHooks
}

export interface CreateHighlighterFn {
  loadLanguage: (lang: string) => Promise<void>
  highlight: (str: string, lang: string, attrs: string) => string
  dispose: () => void
}

export async function createHighlighter(
  options: CreateHighlighterOptions
): Promise<CreateHighlighterFn> {
  const highlighter = await createShikiHighlighter({
    themes:
      typeof options.theme === 'object' && 'light' in options.theme && 'dark' in options.theme
        ? [options.theme.light, options.theme.dark]
        : [options.theme],
    langs: options.languages,
  })

  if (options.shikiConfig) {
    await options.shikiConfig(highlighter)
  }

  function normalizeLang(lang: string | undefined) {
    const normalized = lang ?? options.defaultLang ?? 'txt'
    return highlighter.getLoadedLanguages().includes(normalized) ? normalized : 'txt'
  }

  function isBundledLang(lang: string): lang is BundledLanguage {
    return lang in highlighter.getBundledLanguages()
  }

  return {
    async loadLanguage(lang) {
      if (highlighter.getLoadedLanguages().includes(lang)) return

      /** only load if already known language */
      if (isBundledLang(lang)) return highlighter.loadLanguage(lang)
    },
    highlight(str, lang, attrs) {
      return highlighter.codeToHtml(str, {
        lang: normalizeLang(lang),
        transformers: [transformerDisableVueInterpolation()],
        meta: { __attrs: attrs },
        ...(typeof options.theme === 'object' && 'light' in options.theme && 'dark' in options.theme
          ? { themes: options.theme, defaultColor: false }
          : { theme: options.theme }),
      })
    },
    dispose() {
      return highlighter.dispose()
    },
  }
}

function transformerDisableVueInterpolation(): ShikiTransformer {
  return {
    name: 'local:transformer-disable-vue-interpolation',
    pre(hast) {
      hast.properties['v-pre'] = ''
    },
  }
}
