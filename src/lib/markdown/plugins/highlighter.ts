import type { MarkdownItAsync } from 'markdown-it-async'
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
import { createHighlighter, isSpecialLang } from 'shiki'

export type HighlighterOptions = Partial<Pick<CodeOptionsMultipleThemes<BuiltinTheme>, 'themes'>> &
  TransformerOptions & {
    langs?: Array<LanguageInput | BuiltinLanguage>
    langAlias?: Record<string, string>
    defaultLang?: LanguageInput | BuiltinLanguage | SpecialLanguage
  }

let _highlighter: Highlighter | null

export async function getHighlighter(opts: HighlighterOptions) {
  const themes = Object.values(opts.themes || {}).filter(Boolean) as BuiltinTheme[]

  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes,
      langs: opts.langs || [],
      langAlias: opts.langAlias || {},
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

export async function highlighterPlugin(md: MarkdownItAsync, opts: HighlighterOptions = {}) {
  opts.langAlias ||= {}
  opts.defaultLang ||= 'txt'
  opts.themes ||= { light: 'vitesse-light', dark: 'vitesse-dark' }

  const highlighter = await getHighlighter(opts)

  md.options.highlight = async (code, lang, attrs) => {
    lang ||= opts.defaultLang as string

    const transformers: ShikiTransformer[] = []

    transformers.push(transformerMetaHighlight())
    transformers.push(transformerNotationDiff())
    transformers.push(transformerNotationErrorLevel())
    transformers.push(
      transformerNotationFocus({
        classActiveLine: 'has-focus',
        classActivePre: 'has-focused-lines',
      })
    )
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
    })
  }
}
