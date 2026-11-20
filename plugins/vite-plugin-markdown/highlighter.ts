import type {
  BuiltinLanguage,
  BuiltinTheme,
  BundledLanguage,
  Highlighter,
  LanguageInput,
  ShikiTransformer,
  ThemeRegistrationAny,
} from 'shiki'
import type { Awaitable } from './utils/types.ts'
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
   * Add custom shiki transformers
   */
  shikiTransformers?: ShikiTransformer[]
  /**
   * Configure shiki instance.
   */
  shikiConfig?: HighlighterHooks
}

export interface CreateHighlighterFn {
  loadLanguage: (langs: string[]) => Promise<void>
  highlight: (code: string, lang: string, meta: string) => string
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
    const wanted = lang || options.defaultLang || 'txt'
    return highlighter.getLoadedLanguages().includes(wanted) ? wanted : 'txt'
  }

  function isBundledLang(lang: string): lang is BundledLanguage {
    return lang in highlighter.getBundledLanguages()
  }

  return {
    async loadLanguage(langs) {
      const pending = langs.filter(
        l => !highlighter.getLoadedLanguages().includes(l) && isBundledLang(l)
      )
      await Promise.all(pending.map(p => highlighter.loadLanguage(p as BundledLanguage)))
    },
    highlight(code, lang, meta) {
      return highlighter.codeToHtml(code, {
        lang: normalizeLang(lang),
        meta: { __raw: meta },
        transformers: [transformerDisableVueInterpolation(), ...(options.shikiTransformers ?? [])],
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
