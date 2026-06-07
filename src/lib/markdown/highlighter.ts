import type {
  BuiltinLanguage,
  BuiltinTheme,
  CodeOptionsMultipleThemes,
  LanguageInput,
  Highlighter as ShikiHighlighter,
  ShikiTransformer,
  SpecialLanguage,
  TransformerOptions,
} from 'shiki'
import type { MarkdownExit } from 'unplugin-vue-markdown/types'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { isSpecialLang, createHighlighter as sCreateHighlighter } from 'shiki'
import { extractFenceLanguage, FENCE_DEFAULT_LANG, FENCE_DEFAULT_THEMES } from './utils'

export type HighlighterOptions = Partial<Pick<CodeOptionsMultipleThemes<BuiltinTheme>, 'themes'>> &
  TransformerOptions & {
    langs?: Array<LanguageInput | BuiltinLanguage>
    langAlias?: Record<string, string>
    defaultLang?: LanguageInput | BuiltinLanguage | SpecialLanguage
  }

export function createHighlighter(opts?: HighlighterOptions) {
  return new Highlighter(opts ?? {})
}

export class Highlighter {
  private highlighter: ShikiHighlighter | null
  private options: Parameters<typeof sCreateHighlighter>[0]

  defaultLang = FENCE_DEFAULT_LANG
  defaultThemes = FENCE_DEFAULT_THEMES

  constructor(opts: HighlighterOptions) {
    this.highlighter = null
    this.options = this.resolveOptions(opts)
  }

  async getHighlighter() {
    if (!this.highlighter) {
      this.highlighter = await sCreateHighlighter(this.options)
    }

    return this.highlighter
  }

  clearHighlighter() {
    if (this.highlighter) {
      this.highlighter.dispose()
      this.highlighter = null
    }
  }

  async highlighterPlugin(md: MarkdownExit) {
    const highlighter = await this.getHighlighter()

    md.options.highlight = async (code: string, lang: string, attrs: string) => {
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
        lang = this.defaultLang
      }

      return highlighter.codeToHtml(code, {
        themes: this.defaultThemes,
        defaultColor: false,
        meta: { __raw: attrs },
        lang,
        transformers,
      })
    }
  }

  private resolveOptions(opts: HighlighterOptions): Parameters<typeof sCreateHighlighter>[0] {
    return {
      themes: Object.values(opts.themes ?? this.defaultThemes).filter(Boolean) as BuiltinTheme[],
      langs: opts.langs ?? [],
      langAlias: opts.langAlias ?? {},
    }
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
