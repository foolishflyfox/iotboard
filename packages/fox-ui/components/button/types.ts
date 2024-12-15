import type { IUIInputData } from '@leafer-ui/interface';
import type { FoxButton } from '.';

export interface FoxButtonProps {
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

export type FoxButtonInstance = InstanceType<typeof FoxButton>;
