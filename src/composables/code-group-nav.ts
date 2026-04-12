import { onMounted, onUnmounted } from 'vue'
import { inBrowser } from '@/lib/utils'

export function useCodeGroupNav() {
  if (inBrowser) {
    function codeGroupNavHandler(ev: MouseEvent) {
      const target = ev.target as HTMLElement

      if (target.matches('div.code-group input[type=radio]')) {
        const parent = target.parentElement?.parentElement as HTMLElement
        if (!parent) return

        const index = Array.from(parent.querySelectorAll('input[type=radio]')).indexOf(target)
        if (index < 0) return

        const contents = parent.querySelector('.blocks')
        if (!contents) return

        const activeContent = Array.from(contents.children).find(node =>
          node.classList.contains('active')
        )
        const targetContent = contents.children[index]
        if (!targetContent || targetContent === activeContent) return

        activeContent?.classList.remove('active')
        targetContent.classList.add('active')
      }
    }

    onMounted(() => {
      window.addEventListener('click', codeGroupNavHandler)
    })
    onUnmounted(() => {
      window.removeEventListener('click', codeGroupNavHandler)
    })
  }
}
