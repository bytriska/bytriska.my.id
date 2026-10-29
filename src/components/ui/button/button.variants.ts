import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const variantStyles = {
  default: 'cn-button-variant-default',
  outline: 'cn-button-variant-outline',
  secondary: 'cn-button-variant-secondary',
  ghost: 'cn-button-variant-ghost',
  destructive: 'cn-button-variant-destructive',
  link: 'cn-button-variant-link',
}

const sizeStyles = {
  default: 'cn-button-size-default',
  xs: 'cn-button-size-xs',
  sm: 'cn-button-size-sm',
  lg: 'cn-button-size-lg',
  icon: 'cn-button-size-icon',
  'icon-xs': 'cn-button-size-icon-xs',
  'icon-sm': 'cn-button-size-icon-sm',
  'icon-lg': 'cn-button-size-icon-lg',
}

function whenStyled(key: 'variant' | 'size', styles: Record<string, string>) {
  return Object.entries(styles).map(([value, cls]) => ({
    [key]: value,
    unstyled: false,
    class: cls,
  }))
}

export const buttonVariants = tv({
  base: 'cn-button group/button inline-flex shrink-0 items-center justify-center align-middle whitespace-nowrap transition-all outline-none select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  variants: {
    variant: {
      default: '',
      outline: '',
      secondary: '',
      ghost: '',
      destructive: '',
      link: '',
    },
    size: {
      default: '',
      xs: '',
      sm: '',
      lg: '',
      icon: '',
      'icon-xs': '',
      'icon-sm': '',
      'icon-lg': '',
    },
    block: {
      true: 'w-full',
      false: '',
    },
    unstyled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    ...whenStyled('variant', variantStyles),
    ...whenStyled('size', sizeStyles),
  ] as any,
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {}
