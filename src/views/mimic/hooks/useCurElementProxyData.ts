import type { IUIInputData, UI } from 'leafer-editor';
import { useMimicDisplayStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';

let proxyData: ComputedRef<IUIInputData | undefined>;
export function useCurElementProxyData() {
  if (!proxyData) {
    const mimicDisplayStatus = useMimicDisplayStatus();
    proxyData = computed(
      () => {
        return (mimicVar.displayEditor.findUiById(mimicDisplayStatus.selectedUiId) as UI).proxyData;
      }
    );
  }
  return proxyData!;
}
