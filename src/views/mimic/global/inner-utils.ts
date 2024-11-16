import type { OpenedTarget } from '@mimic/types';

export function generateTargetKey(target: OpenedTarget) {
  return `${target.editorType}:${target.path}`;
}
