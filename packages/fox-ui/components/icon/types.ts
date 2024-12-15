import type { FoxIcon } from './index';

export interface FoxIconProps {
  icon?: string
  color?: string
  size?: number
  loading?: boolean
}

export type FoxIconInstance = InstanceType<typeof FoxIcon>;
