<template>
  <n-modal
    display-directive="if"
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
        <n-tabs default-value="draw" class="px-10px h-full">
          <n-tab-pane name="draw" class="h-full" display-directive="show">
            <template #tab>
              绘图
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor
              :value="drawCode"
              :prefix-code="drawPrefixCode"
              @update:value="updateDrawCode"
            />
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
              碰撞检测
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
        <div class="flex-1 bg-light-200" id="mimicComponentTestPreview" />
      </div>
    </div>
    <template #action>
      <n-space>
        <n-button type="primary" size="small" @click="refresh">刷新</n-button>
        <n-button type="primary" size="small" :disabled="isConfirmBtnDisabled" @click="save">
          确定
        </n-button>
        <n-button type="primary" size="small" @click="close">取消</n-button>
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
import {
  componentPathToTag,
  componentTagToPath,
  componentTagToPreviewPngPath,
  eventBus,
  getUiClassByTag,
} from '@mimic/utils';
import { App, Rect, ResizeEvent } from 'leafer-ui';
import * as _ from 'lodash-es';
import { registerTestUiClass } from '@mimic/custom/registrar';
import { mimicFileApi } from '@/service/api';

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
let app: App | undefined = undefined;

const componentTag = computed(() => {
  if (mimicWorkspaceStatus.currentTarget?.editorType === 'component') {
    return componentPathToTag(mimicWorkspaceStatus.currentTarget.path);
  }
  return null;
});

const componentJson = computed(() => {
  if (componentTag.value) {
    const componentJson = JSON.parse(mimicVar.componentJsonStrDict[componentTag.value]);
    return componentJson;
  }
  return {};
});

const props = defineProps<{
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
const newDrawCode = ref('');
function updateDrawCode(newCode: string) {
  newDrawCode.value = newCode;
}

const isConfirmBtnDisabled = computed(() => _.isEmpty(newDrawCode.value));

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
function hit(inner) {`;
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

function generateNewComponentJson() {
  const newComponentJson = _.cloneDeep(componentJson.value);
  if (!_.isEmpty(newDrawCode.value)) {
    newComponentJson.draw = 'function(canvas) {\n' + newDrawCode.value + '\n}';
  }
  return newComponentJson;
}

function refresh() {
  // mark: 添加组件刷新功能
  // 第一步: 根据当前配置生成新的组件 json
  const newComponentJson = generateNewComponentJson();
  if (componentTag.value) {
    app?.tree.clear();
    try {
      // 第二步: 根据 json 加载新的组件(形成的 tag 为 test:原组件tag)
      const uiClass = registerTestUiClass(componentTag.value, JSON.stringify(newComponentJson));
      if (uiClass) {
        // 第三步: 将新组件加载显示
        const newComponent = new uiClass({ x: 0, y: 0, draggable: false });
        app?.tree.add(newComponent);
      }
    } catch (e: any) {
      window.$message?.error(`代码存在错误: ${e.message}`);
      throw e;
    }
  }
}

async function save() {
  refresh();
  const blob = (await app?.tree.export('png', { blob: true }))?.data;
  if (blob && componentTag.value) {
    const pngPath = componentTagToPreviewPngPath(componentTag.value)!;
    // 将代码保存到后端
    const newComponentJson = generateNewComponentJson();
    const componentPath = componentTagToPath(componentTag.value)!;
    await mimicFileApi.saveComponent(componentPath, newComponentJson);
    // 更新预览图片
    await mimicFileApi.uploadPreviewPng('component', pngPath, blob);
    close();
    eventBus.emitComponentUpdate(componentTag.value);
  }
}

watch(
  () => props.showModal,
  nv => {
    if (nv) {
      newDrawCode.value = '';
      nextTick(() => {
        app = new App({
          view: 'mimicComponentTestPreview',
          tree: {},
          editor: {},
          type: 'draw',
        });
        app.tree.on(ResizeEvent.RESIZE, () => app?.tree.zoom('fit', 10));
        if (componentTag.value) {
          const uiClass = getUiClassByTag(componentTag.value);

          if (uiClass) {
            const newComponent = new uiClass({ x: 0, y: 0, draggable: false });
            app.tree.add(newComponent);
          }
        }
      });
    } else {
      if (app) {
        app.destroy();
        app = undefined;
      }
    }
  },
);
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
