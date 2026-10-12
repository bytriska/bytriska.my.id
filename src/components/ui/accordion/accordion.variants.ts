import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const accordionVariants = tv({
  slots: {
    root: 'cn-accordion flex w-full flex-col',
  },
})

export type AccordionVariantsProps = VariantProps<typeof accordionVariants>
