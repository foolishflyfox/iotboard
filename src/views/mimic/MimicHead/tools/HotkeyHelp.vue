<template>
  <NModal
    preset="card"
    content-class="flex-1 overflow-auto bg-#eee"
    :show class="w-500px h-75vh flex"
    @close="close"
  >
    <template #header>
      快捷键
    </template>
    <div>
      <div v-for="group of hotKeyGroups" :key="group.group">
        <NDivider :title-placement>
          <div class="text-18px">
            {{ group.group }}
          </div>
        </NDivider>
        <div
          class="flex-y-center text-16px my-3px px-1em"
          v-for="(item, i) of group.items"
          :key="item.value"
          :style="{ backgroundColor: i % 2 === 1 ? '#fff' : undefined }"
        >
          <div
            class="w-8em font-medium"
          >
            {{ item.label }}
          </div>
          <div>{{ item.value }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end mt-0.5em">
        <NButton size="small" @click="close">
          关闭
        </NButton>
      </div>
    </template>
  </NModal>
</template>

<script setup lang="ts">
import { NModal, NButton, NDivider } from 'naive-ui';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  'update:show': [boolean]
}>();

const titlePlacement = 'left';

function close() {
  emit('update:show', false);
}

const hotKeyGroups = [{
  group: '编辑器',
  items: [
    { label: '视图放大', value: 'ctrl/cmd + 鼠标滚轮↑' },
    { label: '视图缩小', value: 'ctrl/cmd + 鼠标滚轮↓' },
    { label: '视图拖动', value: '按下鼠标中键 + 移动' },
    { label: '添加辅助线', value: '单击标尺' },
    { label: '删除辅助线', value: '双击标尺' }
  ]
}, {
  group: '图纸',
  items: [
    { label: '保存', value: 'ctrl/cmd + s' },
  ]
}];
</script>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 5px;
  margin-bottom: 8px;
}
:deep(div.n-divider__line.n-divider__line--left) {
  background-color: #ccc;
}
:deep(div.n-divider__line.n-divider__line--right) {
  background-color: #ccc;
}
</style>
