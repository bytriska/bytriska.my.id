import type { ButtonVariantProps } from './button'
import { tv } from 'tailwind-variants'
import button from './button'

const link = tv({
  extend: button,
  defaultVariants: {
    color: 'stone',
    variant: 'link',
  },
})

export interface LinkVariantProps extends ButtonVariantProps {}
export default link
