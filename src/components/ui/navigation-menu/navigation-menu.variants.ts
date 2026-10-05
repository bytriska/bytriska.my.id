import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const navigationMenuVariants = tv({
  slots: {
    root: 'cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
    list: 'cn-navigation-menu-list group flex flex-1 list-none items-center justify-center',
    item: 'cn-navigation-menu-item relative',
    trigger:
      'cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none',
    viewport:
      'cn-navigation-menu-viewport origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden md:w-(--radix-navigation-menu-viewport-width)',
  },
})

export type NavigationMenuVariantsProps = VariantProps<typeof navigationMenuVariants>
