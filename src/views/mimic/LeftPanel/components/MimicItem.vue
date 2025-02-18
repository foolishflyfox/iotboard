<template>
  <div
    class="inline-block bg-[#fff8] rounded-lg flex flex-col justify-between"
    @contextmenu.prevent="
      e => {
        selected = true;
        showMenu(e);
      }
    "
    @dblclick="dblclickHandler"
    :style="{ borderWidth: '1px', borderColor: selected ? '#0bf' : '#0000' }"
    ref="mimicItemContainerRef"
  >
    <img
      :src="imgSrc"
      class="p-4px max-w-42px max-h-42px mx-auto"
      :style="{ cursor: draggable ? 'grab' : 'default' }"
      @dragstart="e => emit('dragStart', e)"
      :draggable
    >
    <div
      :title="fileName"
      class="text-12px text-[#555] font-medium text-center
      cursor-default w-42px ellipsis-text select-none"
    >
      {{ fileName }}
    </div>
    <NDropdown
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
  if (action === 'delete') {
    showDeleteTargetModal.value = true;
  }
}

function confirmDeleteTarget() {
  emit('delete');
}

const selected = ref(false);
function dblclickHandler() {
  selected.value = true;
  emit('open');
}
const mimicItemContainerRef = ref<HTMLElement>();
onClickOutside(mimicItemContainerRef, e => (selected.value = false));
</script>

<style scoped></style>
