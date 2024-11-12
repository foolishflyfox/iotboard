import { findUiById } from '@mimic/utils';
import type { UI } from 'leafer-ui';
import { useMimicDisplayStatus } from '../stores';

export function useCurElementProxyData() {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const curElementProxyData = computed(
    () => (findUiById(mimicDisplayStatus.selectedUiId) as UI).proxyData,
  );
  return curElementProxyData;
}
