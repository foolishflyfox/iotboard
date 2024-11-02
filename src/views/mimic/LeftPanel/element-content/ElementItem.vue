<template>
  <div class="inline-block bg-[#fff8] rounded-lg">
    <img
      :src="getElementPreview('name')"
      width="42"
      class="cursor-grab p-4px"
      @error="
        e => {
          (e.target as any).src = getElementPreview('default');
        }
      "
      :draggable="mimicWorkspaceStatus.curEditorType === 'component'"
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomDragIcon } from '@mimic/types';
import { getElementPreview } from '@mimic/utils';
import { useMimicWorkspaceStatus } from '@mimic/stores';

interface ElementItemProp extends CustomDragIcon {
  name: string;
}
defineProps<ElementItemProp>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
</script>

<style scoped></style>
