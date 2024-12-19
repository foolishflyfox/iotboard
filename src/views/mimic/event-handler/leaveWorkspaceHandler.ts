import { mimicVar } from '@mimic/global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

export function leaveWorkspaceHandler() {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  mimicVar.baselineManager.clearCurBaseLine();
  mimicWorkspaceStatus.cursorPos = undefined;
}
