import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const accordionVariants = tv({
  slots: {
    root: 'cn-accordion flex w-full flex-col',
    content: 'cn-accordion-content overflow-hidden',
    contentInner:
      'cn-accordion-content-inner [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
  },
})

export type AccordionVariantsProps = VariantProps<typeof accordionVariants>
