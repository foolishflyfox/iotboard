import { mimicVar } from '@mimic/global';

export function leaveWorkspaceHandler() {
  mimicVar.baselineManager.clearCurBaseLine();
}
