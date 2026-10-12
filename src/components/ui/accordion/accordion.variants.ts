import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const accordionVariants = tv({
  slots: {
    root: 'cn-accordion flex w-full flex-col',
    content: 'cn-accordion-content overflow-hidden',
    contentInner:
      'cn-accordion-content-inner [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
    item: 'cn-accordion-item',
    header: 'cn-accordion-header flex',
    trigger:
      'cn-accordion-trigger group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
    triggerIcon:
      'cn-accordion-trigger-icon pointer-events-none shrink-0 transition-transform group-data-[state=open]/accordion-trigger:rotate-180',
  },
})

export type AccordionVariantsProps = VariantProps<typeof accordionVariants>
