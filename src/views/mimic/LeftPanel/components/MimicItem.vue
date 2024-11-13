<template>
  <div class="inline-block bg-[#fff8] rounded-lg" @contextmenu.prevent="showMenu">
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
  </div>
</template>

<script setup lang="ts">
import { NDropdown, type DropdownOption } from 'naive-ui';
import { useContextShowHide } from '@mimic/hooks';
withDefaults(
  defineProps<{
    imgSrc: string;
    draggable?: boolean;
    fileName?: string;
  }>(),
  {
    draggable: false,
  },
);
const emit = defineEmits<{
  dragStart: [payload: DragEvent];
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

function clickContextMenuHandler(action: string) {
  hideMenu();
  console.log('处理', action);
}
</script>

<style scoped></style>
