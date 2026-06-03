export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise
    || (typeof value === 'object'
      && value !== null
      && 'then' in value
      && typeof (value as Record<string, unknown>).then === 'function'
      && 'catch' in value
      && typeof (value as Record<string, unknown>).catch === 'function')
  )
}
