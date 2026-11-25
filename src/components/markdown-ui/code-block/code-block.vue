<script lang="ts">
import { CheckIcon, CopyIcon, FileIcon } from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { toValue } from 'vue'
import { Button } from '@/components/ui/button'

export interface CodeBlockProps {
  language: string
  title?: string
}

export interface CodeBlockSlots {
  default?: () => any
}

const LINE_ENDINGS_RE = /\n+/g
const COPY_IGNORE_SELECTOR = ['.diff.remove', '.copy-ignore'] as const
</script>

<script setup lang="ts">
defineProps<CodeBlockProps>()
defineSlots<CodeBlockSlots>()

const clipboard = useClipboard()

function copy(ev: MouseEvent) {
  if (!(ev.target instanceof Element)) return

  const buttonEl = ev.target.closest('figure.code-block button.code-block__copy')
  if (!buttonEl) return

  const figureEl = buttonEl.closest('figure.code-block')
  const preEl = figureEl?.querySelector('pre')
  if (!figureEl || !preEl) return

  const clone = preEl.cloneNode(true) as HTMLElement

  clone.querySelectorAll(COPY_IGNORE_SELECTOR.join(',')).forEach(el => el.remove())
  clone.innerHTML = clone.innerHTML.replace(LINE_ENDINGS_RE, '\n')
  clipboard.copy(clone.textContent || '')
}
</script>

<template>
  <figure
    :data-language="$props.language"
    :data-titled="$props.title ? '' : undefined"
    class="code-block"
  >
    <figcaption v-if="$props.title">
      <span class="code-block__icon">
        <FileIcon aria-hidden="true" />
      </span>
      <span class="code-block__title">{{ $props.title }}</span>
    </figcaption>

    <Button
      v-if="clipboard.isSupported"
      unstyled
      aria-label="Copy code"
      :data-copied="toValue(clipboard.copied) ? '' : undefined"
      class="code-block__copy"
      @click="copy"
    >
      <CopyIcon aria-hidden="true" class="code-block__icon-copy" />
      <CheckIcon aria-hidden="true" class="code-block__icon-check" />
    </Button>

    <slot />

    <span role="status" class="sr-only">{{
      toValue(clipboard.copied) ? 'Copied to clipboard' : ''
    }}</span>
  </figure>
</template>
