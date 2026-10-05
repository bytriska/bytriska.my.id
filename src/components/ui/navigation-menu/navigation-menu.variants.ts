import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const navigationMenuVariants = tv({
  slots: {
    root: 'cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
    viewport:
      'cn-navigation-menu-viewport origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden md:w-(--radix-navigation-menu-viewport-width)',
  },
})

export type NavigationMenuVariantsProps = VariantProps<typeof navigationMenuVariants>
