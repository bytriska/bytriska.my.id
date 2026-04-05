import { onMounted, onUnmounted } from 'vue'
import { inBrowser } from '@/lib/utils'

const ignoredNodes: string[] = ['.div.remove']

export function useCopyCode() {
  if (inBrowser) {
    const timeoutIds: WeakMap<HTMLElement, number> = new WeakMap()

    function copyCodeHandler(ev: MouseEvent) {
      const target = ev.target as HTMLElement

      if (target.matches('div[class*="language-"] > button.copy-button')) {
        const parent = target.parentElement as HTMLElement
        const code = parent?.querySelector('pre') as HTMLElement

        if (!code) return

        const clone = code.cloneNode(true) as HTMLElement

        clone.querySelectorAll(ignoredNodes.join(',')).forEach(node => node.remove())
        clone.innerHTML = clone.innerHTML.replace(/\n+/g, '\n')

        const text = clone.textContent || ''
        function copiedCallback() {
          target.classList.add('copied')
          clearTimeout(timeoutIds.get(target))

          timeoutIds.set(
            target,
            window.setTimeout(() => {
              target.classList.remove('copied')
              target.blur()
              timeoutIds.delete(target)
            }, 2000)
          )
        }

        copyToClipboard(text).then(copiedCallback)
      }
    }

    onMounted(() => {
      window.addEventListener('click', copyCodeHandler)
    })
    onUnmounted(() => {
      window.removeEventListener('click', copyCodeHandler)
    })
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    const previousFocusedEl = document.activeElement

    textarea.value = text

    textarea.setAttribute('readonly', '') // prevent mobile keyboard from showing
    textarea.style.contain = 'strict'
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    textarea.style.fontSize = '12px' // prevent zooming on iOS

    const selection = document.getSelection()
    const previousSelectionRange = selection?.rangeCount ? selection.getRangeAt(0) : null

    document.body.appendChild(textarea)
    textarea.select()

    // explicit selection range for iOS
    textarea.setSelectionRange(0, text.length)

    document.execCommand('copy')
    document.body.removeChild(textarea)

    if (previousSelectionRange) {
      selection!.removeAllRanges()
      selection!.addRange(previousSelectionRange)
    }

    if (previousFocusedEl instanceof HTMLElement) {
      previousFocusedEl.focus()
    }
  }
}
