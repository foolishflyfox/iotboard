import { mimicVar } from '@mimic/global';
import { useMimicWorkspaceStatus } from '@mimic/stores';

export function leaveWorkspaceHandler() {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  mimicVar.baselineManagerContainer.getManager()?.clearCurBaseLine();
  mimicWorkspaceStatus.cursorPos = undefined;
}
