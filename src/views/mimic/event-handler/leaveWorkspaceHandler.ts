import { mimicVar } from '@mimic/global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

export function leaveWorkspaceHandler() {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  mimicVar.baselineManagerContainer.getBaselineManager()?.clearCurBaseLine();
  mimicWorkspaceStatus.cursorPos = undefined;
}
