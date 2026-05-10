export interface PostFrontmatter {
  title: string
  slug: string
  description: string
  author: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags?: string[]
  series?: string
  seriesOrder?: number
  coverImage?: string
  coverImageAlt?: string
  ogImage?: string
  readingTime?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  draft?: boolean
  featured?: boolean
  noIndex?: boolean
  canonicalUrl?: string
}

export interface Post {
  path: string
  meta: PostFrontmatter
}

export interface NavigationItem {
  title: string
  path: string
}

export interface MarkdownItHeader {
  level: number
  title: string
  slug: string
  link: string
  children?: MarkdownItHeader[]
}
