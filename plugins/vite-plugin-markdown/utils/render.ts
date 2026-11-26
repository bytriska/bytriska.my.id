export function escapeVueProps(props: unknown) {
  if (props == null) return

  return JSON.stringify(props)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
