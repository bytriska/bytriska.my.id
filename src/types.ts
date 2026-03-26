export interface MarkdownItHeader {
  level: number
  title: string
  slug: string
  link: string
  children?: MarkdownItHeader[]
}
