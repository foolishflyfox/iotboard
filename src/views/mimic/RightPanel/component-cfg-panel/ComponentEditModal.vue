<template>
  <n-modal
    :show="showModal"
    preset="dialog"
    @close="close"
    :show-icon="false"
    class="flex flex-col px-8px py-10px"
    :style="modalStyle"
    content-class="flex-1 "
  >
    <template #header>
      <div>编辑组件</div>
    </template>
    <template #close>
      <n-space size="small">
        <n-icon
          size="20"
          class="cursor-pointer"
          :component="isFullView ? Contract : Expand"
          @click="isFullView = !isFullView"
        />
        <n-icon size="20" class="cursor-pointer" @click="close">
          <Close />
        </n-icon>
      </n-space>
    </template>
    <!-- <div>默认显示: todo - 测试自定义 bound 等的作用，并写说明文档</div> -->
    <div class="h-full flex">
      <div class="bg-gray-200 w-60%">
        <n-tabs default-value="draw" class="px-5px h-full">
          <n-tab-pane name="draw" class="h-full">
            <template #tab>
              绘图
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor value="const a = 1;" />
          </n-tab-pane>
          <n-tab-pane name="drawHitPath">
            <template #tab>
              轮廓
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            轮廓配置
          </n-tab-pane>
          <n-tab-pane name="hit">
            <template #tab>
              碰撞监测
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            碰撞
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="flex-1 flex-col">
        <div class="bg-pink-100 h-60%">配置区</div>
        <div class="bg-blue-100 flex-1">预览区</div>
      </div>
    </div>
    <template #action>
      <n-space>
        <n-button type="primary" size="small">刷新</n-button>
        <n-button type="primary" size="small">确定</n-button>
        <n-button type="primary" size="small">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NSpace, NButton, NIcon, NTabs, NTabPane } from 'naive-ui';
import { Close, Expand, Contract } from '@vicons/ionicons5';
import { QuestionCircle16Filled } from '@vicons/fluent';
import DrawCodeEditor from './DrawCodeEditor.vue';

defineProps<{
  showModal?: boolean;
}>();

const fullViewStyle = {
  width: '100vw',
  height: '100vh',
};
const normalViewStyle = {
  width: '1150px',
  height: '750px',
};

const isFullView = ref(false);
const modalStyle = computed(() => (isFullView.value ? fullViewStyle : normalViewStyle));

const emit = defineEmits<{
  'update:showModal': [v: boolean];
}>();

function close() {
  emit('update:showModal', false);
}
</script>

<style scoped></style>
