import type { IUIInputData } from '@leafer-ui/interface';

export interface ButtonProps {
  text?: string
  size?: 'large' | 'default' | 'small' | ''
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  plain?: boolean
  link?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  loadingIcon?: string
  icon?: string
  iconRight?: string
  disabled?: boolean
  color?: string
  children?: IUIInputData[];
  onClick?: (...args: any) => any
}
