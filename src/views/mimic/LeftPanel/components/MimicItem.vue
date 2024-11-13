<template>
  <div
    class="inline-block bg-[#fff8] rounded-lg"
    @contextmenu.prevent="showMenu"
    @dblclick="dblclickHandler"
    :style="{ borderWidth: '1px', borderColor: dblclicked ? '#0bf' : '#0000' }"
    ref="mimicItemContainerRef"
  >
    <img
      :src="imgSrc"
      width="42"
      class="p-4px"
      :style="{ cursor: draggable ? 'grab' : 'default' }"
      @dragstart="e => emit('dragStart', e)"
      :draggable
    />
    <div class="text-12px text-[#555] font-medium text-center cursor-default w-42px ellipsis-text">
      {{ fileName }}
    </div>
    <n-dropdown
      placement="bottom-start"
      size="small"
      trigger="manual"
      :options
      :x
      :y
      :show
      @clickoutside="hideMenu"
      @select="clickContextMenuHandler"
    />
    <QueryDialog
      title="删除"
      v-model:show-modal="showDeleteTargetModal"
      type="warning"
      @positive-click="confirmDeleteTarget"
    >
      <div>确认删除 【{{ fileName }}】?</div>
    </QueryDialog>
  </div>
</template>

<script setup lang="ts">
import { NDropdown, type DropdownOption } from 'naive-ui';
import { useContextShowHide } from '@mimic/hooks';
import type { EditorType } from '@mimic/types';
import { QueryDialog } from '@/components';
import { onClickOutside } from '@vueuse/core';
import { useMimicWorkspaceStatus } from '@mimic/stores';

const props = withDefaults(
  defineProps<{
    editorType: EditorType;
    imgSrc: string;
    draggable?: boolean;
    fileName: string;
  }>(),
  {
    draggable: false,
  },
);

const emit = defineEmits<{
  dragStart: [payload: DragEvent];
  delete: [];
  open: [];
}>();
const { x, y, show, showMenu, hideMenu } = useContextShowHide();

const options: DropdownOption[] = [
  {
    label: '删除',
    key: 'delete',
  },
  {
    label: '重命名',
    key: 'rename',
  },
];

const showDeleteTargetModal = ref(false);
function clickContextMenuHandler(action: string) {
  hideMenu();
  console.log('处理', action);
  if (action === 'delete') {
    showDeleteTargetModal.value = true;
  }
}

function confirmDeleteTarget() {
  emit('delete');
}

const dblclicked = ref(false);
function dblclickHandler() {
  dblclicked.value = true;
  emit('open');
}
const mimicItemContainerRef = ref<HTMLElement>();
onClickOutside(mimicItemContainerRef, e => (dblclicked.value = false));
</script>

<style scoped></style>
