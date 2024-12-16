import type { IUIInputData } from '@leafer-ui/interface';
import { FoxButton } from '.';

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

export const foxButtonPropKeys: (keyof FoxButtonProps)[] = [
  'text',
  'size',
  'type',
  'plain',
  'link',
  'round',
  'circle',
  'loading',
  'loadingIcon',
  'icon',
  'iconRight',
  'disabled',
  'color',
  'children'
];
// export const foxButtonPropKeys: (keyof FoxButtonProps)[] = ['text', 'size'];

export type FoxButtonInstance = InstanceType<typeof FoxButton>;
