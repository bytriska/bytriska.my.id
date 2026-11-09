import type { Component } from 'vue'
import { FolderGit2Icon, HeartIcon, SquareBookmarkIcon } from '@lucide/vue'

export interface MainNavigationItem {
  title: string
  href: string
  icon: Component
}

export const mainNavigationList: MainNavigationItem[] = [
  { title: 'Posts', href: '/posts', icon: SquareBookmarkIcon },
  { title: 'Showcase', href: '#', icon: FolderGit2Icon },
  { title: 'Sponsor', href: '#', icon: HeartIcon },
]
