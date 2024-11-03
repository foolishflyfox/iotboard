<template>
  <NDropdown placement="bottom-start" trigger="manual" :options size="small" :x :y :show />
</template>

<script setup lang="ts">
import { NDropdown } from 'naive-ui';
import { useMimicWorkspaceStatus } from '@mimic/stores';

defineOptions({
  name: 'ComponentEditorContextMenu',
});
const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const { selectedUiIds } = toRefs(mimicWorkspaceStatus.componentEditor);

const show = ref(false);
const x = ref(0);
const y = ref(0);
const options = [
  {
    label: () => h('div', { style: { color: 'red' } }, '删除'),
    key: 'delete',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '导出图片',
    key: 'exportImage',
    children: [
      {
        label: 'png',
        key: 'png',
      },
      {
        label: 'jpg',
        key: 'jpg',
      },
    ],
  },
];

function onContextMenuClick(event: MouseEvent) {
  console.log('@@@');
  // mimicVar.componentEditor.app?.tree.sele
  if (selectedUiIds.value.length === 1) {
    show.value = true;
  }
  if (show.value) {
    x.value = event.x;
    y.value = event.y;
  }
}

defineExpose({
  onContextMenuClick,
});
</script>

<style scoped></style>
