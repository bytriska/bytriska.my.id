const theme = localStorage.getItem('vueuse-color-scheme') || 'auto'
if (
  theme === 'dark' ||
  (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
