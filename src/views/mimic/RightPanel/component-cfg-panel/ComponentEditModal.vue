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
            <DrawCodeEditor value="const a = 1;">
              <template #prefixCode>
                <VCodeBlock
                  class="fixed-code"
                  :code="prefixCode"
                  highlightjs
                  lang="javascript"
                  theme="atom-one-light"
                  :copy-button="false"
                />
              </template>
              <template #postCode>
                <VCodeBlock
                  class="fixed-code"
                  code="}"
                  highlightjs
                  lang="javascript"
                  theme="atom-one-light"
                  :copy-button="false"
                />
              </template>
            </DrawCodeEditor>
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
          <n-tab-pane name="property">
            <template #tab> 属性 </template>
            <div>
              <n-divider>通用属性</n-divider>
              <div>通用属性(多选框)，默认 x/y/width/height</div>
            </div>
            <div>
              <n-divider>自定义属性</n-divider>
              <div>自定义属性配置，是否导出/类型</div>
            </div>
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
import { NModal, NSpace, NButton, NIcon, NTabs, NTabPane, NDivider } from 'naive-ui';
import { Close, Expand, Contract } from '@vicons/ionicons5';
import { QuestionCircle16Filled } from '@vicons/fluent';
import DrawCodeEditor from './DrawCodeEditor.vue';
import VCodeBlock from '@wdns/vue-code-block';

defineProps<{
  showModal?: boolean;
}>();

const prefixCode = `/**
 * @param {ILeaferCanvas} canvas Canvas 2d 渲染上下文对象
 */`;

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

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
:deep(.fixed-code code) {
  padding: 0 10px;
}
:deep(.fixed-code pre) {
  border-radius: 0 !important;
}
</style>
