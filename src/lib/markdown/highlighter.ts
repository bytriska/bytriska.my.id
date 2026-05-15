import type {
  BuiltinLanguage,
  BuiltinTheme,
  CodeOptionsMultipleThemes,
  Highlighter,
  LanguageInput,
  ShikiTransformer,
  SpecialLanguage,
  TransformerOptions,
} from 'shiki'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { isSpecialLang, createHighlighter as sCreateHighlighter } from 'shiki'
import { extractFenceLanguage, HIGHLIGHTER_DEFAULT_LANGUAGE } from './utils'

let _highlighter: Highlighter | null

export type HighlighterOptions = Partial<Pick<CodeOptionsMultipleThemes<BuiltinTheme>, 'themes'>> &
  TransformerOptions & {
    langs?: Array<LanguageInput | BuiltinLanguage>
    langAlias?: Record<string, string>
    defaultLang?: LanguageInput | BuiltinLanguage | SpecialLanguage
  }

export async function getHighlighter(opts: HighlighterOptions) {
  const themes = Object.values(opts.themes ?? {}).filter(Boolean) as BuiltinTheme[]

  if (!_highlighter) {
    _highlighter = await sCreateHighlighter({
      themes,
      langs: opts.langs ?? [],
      langAlias: opts.langAlias ?? {},
    })
  }

  return _highlighter
}

export function clearHighlighter() {
  if (_highlighter) {
    _highlighter.dispose()
    _highlighter = null
  }
}

export async function createHighlighter(opts: HighlighterOptions = {}) {
  opts.defaultLang ??= HIGHLIGHTER_DEFAULT_LANGUAGE
  opts.langAlias ??= {}
  opts.themes ??= { light: 'vitesse-light', dark: 'vitesse-dark' }

  const highlighter = await getHighlighter(opts)

  return async (code: string, lang: string, attrs: string) => {
    lang ||= opts.defaultLang as string

    const { lang: normalizedLang, attrs: normalizedAttrs } = normalizeLang(lang)
    lang = normalizedLang
    attrs = `${normalizedAttrs} ${attrs}`.trim()

    const transformers: ShikiTransformer[] = []

    transformers.push(transformerMetaHighlight())
    transformers.push(transformerNotationDiff())
    transformers.push(transformerNotationErrorLevel())
    transformers.push(transformerNotationFocus())
    transformers.push(transformerNotationHighlight())

    try {
      if (!isSpecialLang(lang) && !highlighter.getLoadedLanguages().includes(lang)) {
        await highlighter.loadLanguage(lang as BuiltinLanguage)
      }
    } catch {
      console.warn(`\nLanguage "${lang}" not found, using default language`)
      lang = opts.defaultLang as string
    }

    return highlighter.codeToHtml(code, {
      lang,
      themes: opts.themes!,
      transformers,
      meta: { __raw: attrs },
      defaultColor: false,
    })
  }
}

const ATTRS_RE = /(?<!=)\{/g
const WHITESPACE_RE = /^\s+|\s+$/g

function normalizeLang(lang: string): { lang: string; attrs: string } {
  let attrs = ''

  const match = extractFenceLanguage(lang)
  if (match) {
    const orig = lang
    lang = match
    attrs = orig.slice(lang.length).replace(ATTRS_RE, ' {')
    attrs = attrs.trim().replace(WHITESPACE_RE, ' ')
  }

  return { lang, attrs }
}
