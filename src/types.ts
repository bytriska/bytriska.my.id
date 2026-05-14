export interface BaseMeta {
  /** page <title> tag */
  title: string

  /** 150-160 characters for SEO */
  description: string

  /** social share image, 1200x630 pixels */
  ogImage?: string

  /** adds <meta name="robots" content="noindex" /> */
  noIndex?: boolean

  /** canonical URL for SEO */
  canonicalUrl?: string

  /** false = visible, true = draft */
  draft: boolean
}

export interface PageFrontmatter extends BaseMeta {
  layout?: 'default' | 'blank' | 'centered'
}

export interface PostFrontmatter extends BaseMeta {
  slug: string
  author: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags?: string[]
  series?: string
  seriesOrder?: number
  coverImage?: string
  coverImageAlt?: string
  readingTime?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  featured?: boolean
  toc?: MarkdownHeading[]
}

export interface Post {
  path: string
  meta: PostFrontmatter
}

export interface NavigationItem {
  title: string
  path: string
}

export interface MarkdownHeading {
  level: number
  title: string
  slug: string
  path: string
  children: MarkdownHeading[]
}
