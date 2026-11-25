const FENCE_LANGUAGE_RE = /^(\w[\w-]*)(?=$|[\s:{])/
const FENCE_META_LINE_NUMBER_RE = /:(line-numbers=?(\d+)?|no-line-numbers)(?=$|\s|\{)/
const FENCE_META_HIGHLIGHT_RE = /(?<!=)\{\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*\}(?=$|\s)/
const FENCE_META_TITLE_RE = /\[((?:[^[\]]|\[[^[\]]*\])*)\]/
const SPACES_RE = /\s+/g

export function normalizeFenceInfo(info: string) {
  return info
    .replace(FENCE_LANGUAGE_RE, '$& ')
    .replace(FENCE_META_LINE_NUMBER_RE, ' $& ')
    .replace(FENCE_META_HIGHLIGHT_RE, ' $& ')
    .replace(FENCE_META_TITLE_RE, ' $& ')
    .replace(SPACES_RE, ' ')
    .trim()
}

export interface FenceMeta {
  language?: string
  title?: string
  lineNumbers?: boolean | number
}

export function parseFenceInfo(info: string): FenceMeta {
  const language = FENCE_LANGUAGE_RE.exec(info)?.[1]
  const title = FENCE_META_TITLE_RE.exec(info)?.[1]

  let lineNumbers: FenceMeta['lineNumbers']
  const matchLineNumbers = FENCE_META_LINE_NUMBER_RE.exec(info)
  if (matchLineNumbers?.[1]) {
    if (matchLineNumbers[1].startsWith('no-line-numbers')) {
      lineNumbers = false
    } else if (matchLineNumbers[1].startsWith('line-numbers')) {
      if (matchLineNumbers?.[2]) lineNumbers = Number.parseInt(matchLineNumbers[2])
      else lineNumbers = true
    }
  }

  return { language, title, lineNumbers }
}
