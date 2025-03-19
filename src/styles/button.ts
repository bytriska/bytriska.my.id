import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors',
  variants: {
    color: {
      primary: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      error: '',
      stone: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: '',
    },
    size: {
      xs: 'px-2 py-1 text-xs gap-1',
      sm: 'px-2.5 py-1.5 text-xs gap-1.5',
      md: 'px-2.5 py-1.5 text-sm gap-1.5',
      lg: 'px-3 py-2 text-sm gap-2',
      xl: 'px-3 py-2 text-base gap-2',
    },
    block: {
      true: 'w-full justify-center',
    },
  },
  compoundVariants: [
    // Solid variants
    {
      color: 'primary',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-primary hover:bg-ui-primary/75 active:bg-ui-primary/75 disabled:bg-ui-primary aria-disabled:bg-ui-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-primary',
    },
    {
      color: 'secondary',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-secondary hover:bg-ui-secondary/75 active:bg-ui-secondary/75 disabled:bg-ui-secondary aria-disabled:bg-ui-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-secondary',
    },
    {
      color: 'success',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-success hover:bg-ui-success/75 active:bg-ui-success/75 disabled:bg-ui-success aria-disabled:bg-ui-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-success',
    },
    {
      color: 'info',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-info hover:bg-ui-info/75 active:bg-ui-info/75 disabled:bg-ui-info aria-disabled:bg-ui-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-info',
    },
    {
      color: 'warning',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-warning hover:bg-ui-warning/75 active:bg-ui-warning/75 disabled:bg-ui-warning aria-disabled:bg-ui-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-warning',
    },
    {
      color: 'error',
      variant: 'solid',
      class:
        'text-ui-content-inverted bg-ui-error hover:bg-ui-error/75 active:bg-ui-error/75 disabled:bg-ui-error aria-disabled:bg-ui-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-error',
    },
    // Outline variants
    {
      color: 'primary',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-primary/50 text-ui-primary hover:bg-ui-primary/10 active:bg-ui-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-primary',
    },
    {
      color: 'secondary',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-secondary/50 text-ui-secondary hover:bg-ui-secondary/10 active:bg-ui-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-secondary',
    },
    {
      color: 'success',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-success/50 text-ui-success hover:bg-ui-success/10 active:bg-ui-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-success',
    },
    {
      color: 'info',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-info/50 text-ui-info hover:bg-ui-info/10 active:bg-ui-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-info',
    },
    {
      color: 'warning',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-warning/50 text-ui-warning hover:bg-ui-warning/10 active:bg-ui-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-warning',
    },
    {
      color: 'error',
      variant: 'outline',
      class:
        'ring ring-inset ring-ui-error/50 text-ui-error hover:bg-ui-error/10 active:bg-ui-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-error',
    },
    // Soft variants
    {
      color: 'primary',
      variant: 'soft',
      class:
        'text-ui-primary bg-ui-primary/10 hover:bg-ui-primary/15 active:bg-ui-primary/15 focus:outline-none focus-visible:bg-ui-primary/15 disabled:bg-ui-primary/10 aria-disabled:bg-ui-primary/10',
    },
    {
      color: 'secondary',
      variant: 'soft',
      class:
        'text-ui-secondary bg-ui-secondary/10 hover:bg-ui-secondary/15 active:bg-ui-secondary/15 focus:outline-none focus-visible:bg-ui-secondary/15 disabled:bg-ui-secondary/10 aria-disabled:bg-ui-secondary/10',
    },
    {
      color: 'success',
      variant: 'soft',
      class:
        'text-ui-success bg-ui-success/10 hover:bg-ui-success/15 active:bg-ui-success/15 focus:outline-none focus-visible:bg-ui-success/15 disabled:bg-ui-success/10 aria-disabled:bg-ui-success/10',
    },
    {
      color: 'info',
      variant: 'soft',
      class:
        'text-ui-info bg-ui-info/10 hover:bg-ui-info/15 active:bg-ui-info/15 focus:outline-none focus-visible:bg-ui-info/15 disabled:bg-ui-info/10 aria-disabled:bg-ui-info/10',
    },
    {
      color: 'warning',
      variant: 'soft',
      class:
        'text-ui-warning bg-ui-warning/10 hover:bg-ui-warning/15 active:bg-ui-warning/15 focus:outline-none focus-visible:bg-ui-warning/15 disabled:bg-ui-warning/10 aria-disabled:bg-ui-warning/10',
    },
    {
      color: 'error',
      variant: 'soft',
      class:
        'text-ui-error bg-ui-error/10 hover:bg-ui-error/15 active:bg-ui-error/15 focus:outline-none focus-visible:bg-ui-error/15 disabled:bg-ui-error/10 aria-disabled:bg-ui-error/10',
    },
    // Subtle variants
    {
      color: 'primary',
      variant: 'subtle',
      class:
        'text-ui-primary ring ring-inset ring-ui-primary/25 bg-ui-primary/10 hover:bg-ui-primary/15 active:bg-ui-primary/15 disabled:bg-ui-primary/10 aria-disabled:bg-ui-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-primary',
    },
    {
      color: 'secondary',
      variant: 'subtle',
      class:
        'text-ui-secondary ring ring-inset ring-ui-secondary/25 bg-ui-secondary/10 hover:bg-ui-secondary/15 active:bg-ui-secondary/15 disabled:bg-ui-secondary/10 aria-disabled:bg-ui-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-secondary',
    },
    {
      color: 'success',
      variant: 'subtle',
      class:
        'text-ui-success ring ring-inset ring-ui-success/25 bg-ui-success/10 hover:bg-ui-success/15 active:bg-ui-success/15 disabled:bg-ui-success/10 aria-disabled:bg-ui-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-success',
    },
    {
      color: 'info',
      variant: 'subtle',
      class:
        'text-ui-info ring ring-inset ring-ui-info/25 bg-ui-info/10 hover:bg-ui-info/15 active:bg-ui-info/15 disabled:bg-ui-info/10 aria-disabled:bg-ui-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-info',
    },
    {
      color: 'warning',
      variant: 'subtle',
      class:
        'text-ui-warning ring ring-inset ring-ui-warning/25 bg-ui-warning/10 hover:bg-ui-warning/15 active:bg-ui-warning/15 disabled:bg-ui-warning/10 aria-disabled:bg-ui-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-warning',
    },
    {
      color: 'error',
      variant: 'subtle',
      class:
        'text-ui-error ring ring-inset ring-ui-error/25 bg-ui-error/10 hover:bg-ui-error/15 active:bg-ui-error/15 disabled:bg-ui-error/10 aria-disabled:bg-ui-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-error',
    },
    // Ghost variants
    {
      color: 'primary',
      variant: 'ghost',
      class:
        'text-ui-primary hover:bg-ui-primary/10 active:bg-ui-primary/10 focus:outline-none focus-visible:bg-ui-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    {
      color: 'secondary',
      variant: 'ghost',
      class:
        'text-ui-secondary hover:bg-ui-secondary/10 active:bg-ui-secondary/10 focus:outline-none focus-visible:bg-ui-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    {
      color: 'success',
      variant: 'ghost',
      class:
        'text-ui-success hover:bg-ui-success/10 active:bg-ui-success/10 focus:outline-none focus-visible:bg-ui-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    {
      color: 'info',
      variant: 'ghost',
      class:
        'text-ui-info hover:bg-ui-info/10 active:bg-ui-info/10 focus:outline-none focus-visible:bg-ui-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    {
      color: 'warning',
      variant: 'ghost',
      class:
        'text-ui-warning hover:bg-ui-warning/10 active:bg-ui-warning/10 focus:outline-none focus-visible:bg-ui-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    {
      color: 'error',
      variant: 'ghost',
      class:
        'text-ui-error hover:bg-ui-error/10 active:bg-ui-error/10 focus:outline-none focus-visible:bg-ui-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
    },
    // Link variants
    {
      color: 'primary',
      variant: 'link',
      class:
        'text-ui-primary hover:text-ui-primary/75 active:text-ui-primary/75 disabled:text-ui-primary aria-disabled:text-ui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-primary',
    },
    {
      color: 'secondary',
      variant: 'link',
      class:
        'text-ui-secondary hover:text-ui-secondary/75 active:text-ui-secondary/75 disabled:text-ui-secondary aria-disabled:text-ui-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-secondary',
    },
    {
      color: 'success',
      variant: 'link',
      class:
        'text-ui-success hover:text-ui-success/75 active:text-ui-success/75 disabled:text-ui-success aria-disabled:text-ui-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-success',
    },
    {
      color: 'info',
      variant: 'link',
      class:
        'text-ui-info hover:text-ui-info/75 active:text-ui-info/75 disabled:text-ui-info aria-disabled:text-ui-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-info',
    },
    {
      color: 'warning',
      variant: 'link',
      class:
        'text-ui-warning hover:text-ui-warning/75 active:text-ui-warning/75 disabled:text-ui-warning aria-disabled:text-ui-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-warning',
    },
    {
      color: 'error',
      variant: 'link',
      class:
        'text-ui-error hover:text-ui-error/75 active:text-ui-error/75 disabled:text-ui-error aria-disabled:text-ui-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ui-error',
    },
    // Stone variants
    {
      color: 'stone' as const,
      variant: 'solid' as const,
      class:
        'text-ui-content-inverted bg-ui-surface-inverted hover:bg-ui-surface-inverted/90 active:bg-ui-surface-inverted/90 disabled:bg-ui-surface-inverted aria-disabled:bg-ui-surface-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-border-inverted',
    },
    {
      color: 'stone' as const,
      variant: 'outline' as const,
      class:
        'ring ring-inset ring-ui-border-accented text-ui-content-base bg-ui-surface-base hover:bg-ui-surface-elevated active:bg-ui-surface-elevated disabled:bg-ui-surface-base aria-disabled:bg-ui-surface-base focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-border-inverted',
    },
    {
      color: 'stone' as const,
      variant: 'soft' as const,
      class:
        'text-ui-content-base bg-ui-surface-elevated hover:bg-ui-surface-accented/75 active:bg-ui-surface-accented/75 focus:outline-none focus-visible:bg-ui-surface-accented/75 disabled:bg-ui-surface-elevated aria-disabled:bg-ui-surface-elevated',
    },
    {
      color: 'stone' as const,
      variant: 'subtle' as const,
      class:
        'ring ring-inset ring-ui-border-accented text-ui-content-base bg-ui-surface-elevated hover:bg-ui-surface-accented/75 active:bg-ui-surface-accented/75 disabled:bg-ui-surface-elevated aria-disabled:bg-ui-surface-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-border-inverted',
    },
    {
      color: 'stone' as const,
      variant: 'ghost' as const,
      class:
        'text-ui-content-base hover:bg-ui-surface-elevated active:bg-ui-surface-elevated focus:outline-none focus-visible:bg-ui-surface-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
    },
    {
      color: 'stone' as const,
      variant: 'link' as const,
      class:
        'text-ui-content-base hover:text-ui-content-inverted active:text-ui-content-inverted disabled:text-ui-content-muted aria-disabled:text-ui-content-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ui-border-inverted',
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
})

export interface ButtonVariantProps extends VariantProps<typeof button> {}
export default button
