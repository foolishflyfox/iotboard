import type { UI } from 'leafer-ui';
import { useMimicDisplayStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';

export function useCurElementProxyData() {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const curElementProxyData = computed(
    () => (mimicVar.displayEditor.findUiById(mimicDisplayStatus.selectedUiId) as UI).proxyData,
  );
  return curElementProxyData;
}
