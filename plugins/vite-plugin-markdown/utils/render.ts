export function escapeVueProps(props: unknown) {
  return JSON.stringify(props ?? {})
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}
