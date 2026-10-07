import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const navigationMenuVariants = tv({
  slots: {
    root: 'cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
    list: 'cn-navigation-menu-list group flex flex-1 list-none items-center justify-center',
    item: 'cn-navigation-menu-item relative',
    trigger:
      'cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none',
    content:
      'cn-navigation-menu-content top-0 left-0 w-full group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto',
    link: 'cn-navigation-menu-link',
    indicator:
      'cn-navigation-menu-indicator top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
    viewport:
      'cn-navigation-menu-viewport origin-top-center relative mt-1.5 h-(--reka-navigation-menu-viewport-height) w-full overflow-hidden md:w-(--reka-navigation-menu-viewport-width) border border-red-400',
    triggerIcon: 'cn-navigation-menu-trigger-icon',
    indicatorArrow: 'cn-navigation-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45',
  },
})

export type NavigationMenuVariantsProps = VariantProps<typeof navigationMenuVariants>
