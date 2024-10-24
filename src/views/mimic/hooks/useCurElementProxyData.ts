import { findUiById } from '@mimic/utils';
import type { UI } from 'leafer-ui';
import { useMimicWorkspaceStatus } from '../stores';

export function useCurElementProxyData() {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  const curElementProxyData = computed(
    () => (findUiById(mimicWorkspaceStatus.selectedUiId) as UI).proxyData,
  );
  return curElementProxyData;
}
