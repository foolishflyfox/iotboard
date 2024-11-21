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
          <n-tab-pane name="draw" class="h-full" display-directive="show">
            <template #tab>
              绘图
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor :value="drawCode" :prefix-code="drawPrefixCode" />
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
          <n-tab-pane name="drawHitPath" class="h-full" display-directive="show">
            <template #tab>
              轮廓
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor :value="drawHitPathCode" :prefix-code="drawHitPathPrefixCode" />
          </n-tab-pane>
          <n-tab-pane name="hit" class="h-full" display-directive="show">
            <template #tab>
              碰撞监测
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor :value="hitCode" :prefix-code="hitPrefixCode" />
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="flex-1 flex-col">
        <div class="bg-pink-100 h-60%">配置区</div>
        <div class="bg-blue-100 flex-1">mark: 显示组件预览</div>
      </div>
    </div>
    <template #action>
      <n-space>
        <n-button type="primary" size="small" @click="refresh">刷新</n-button>
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
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { componentPathToTag } from '@mimic/utils';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
const componentJson = computed(() => {
  if (mimicWorkspaceStatus.currentTarget?.editorType === 'component') {
    const tag = componentPathToTag(mimicWorkspaceStatus.currentTarget.path);
    const componentJson = JSON.parse(mimicVar.componentJsonStrDict[tag]);
    console.log(new Date(), componentJson);
    return componentJson;
  }
  return {};
});

defineProps<{
  showModal?: boolean;
}>();

const drawPrefixCode = `/**
 * @param {ILeaferCanvas} canvas Canvas 2d 渲染上下文对象
 */
function draw(canvas) {`;

const drawCode = computed(() => {
  if (componentJson.value.draw) {
    const code = componentJson.value.draw as string;
    return code.replace(/^.*\n|(\n.*)$/g, '');
  }
  return '';
});

const drawHitPathPrefixCode = `/**
 * @param {ILeaferCanvas} canvas Canvas 2d 渲染上下文对象
 */
function drawHitPath(hitCanvas) {`;
const drawHitPathCode = computed(() => {
  if (componentJson.value.drawHitPath) {
    const code = componentJson.value.drawHitPath as string;
    return code.replace(/^.*\n|(\n.*)$/g, '');
  }
  return '';
});

const hitPrefixCode = `/**
 * @param {IRadiusPointData} inner
 */
function hit(hitCanvas) {`;
const hitCode = computed(() => {
  if (componentJson.value.hit) {
    const code = componentJson.value.hit as string;
    return code.replace(/^.*\n|(\n.*)$/g, '');
  }
  return '';
});

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

function refresh() {
  // mark: 添加组件刷新功能
  // 第一步: 根据当前配置生成新的组件 json
  // 第二步: 根据 json 加载新的组件(形成的 tag 为 test:原组件tag)
  // 第三步: 将新组件加载显示
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
