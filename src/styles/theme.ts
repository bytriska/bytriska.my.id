export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | (string & {})
export interface Theme {
  colors: ThemeColor[]
}

export default {
  colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
} as Theme
