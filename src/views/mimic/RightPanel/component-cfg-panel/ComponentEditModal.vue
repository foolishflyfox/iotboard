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
        <n-tabs default-value="property" class="px-10px h-full">
          <n-tab-pane name="property" class="h-full">
            <template #tab> 属性 </template>
            <PropertyConfig
              :customPropertyCfgs
              :defaultAppearanceValues
              @update:cfgs="v => (newCustomPropertyCfgs = v)"
              @update:appearance-values="v => (newDefaultAppearanceValues = v)"
            />
          </n-tab-pane>
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
          <n-tab-pane name="drawHitPath" class="h-full" display-directive="show">
            <template #tab>
              轮廓
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor
              :value="drawHitPathCode"
              :prefix-code="drawHitPathPrefixCode"
              @update:value="updateDrawHitPathCode"
            />
          </n-tab-pane>
          <n-tab-pane name="hit" class="h-full" display-directive="show">
            <template #tab>
              碰撞检测
              <n-icon class="ml-2px cursor-help">
                <!-- todo 点击后跳转帮助 -->
                <QuestionCircle16Filled />
              </n-icon>
            </template>
            <DrawCodeEditor
              :value="hitCode"
              :prefix-code="hitPrefixCode"
              @update:value="updateHitCode"
            />
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="flex-1 flex-col">
        <div class="bg-gray-100 h-60%">
          <CustomCfgPanel
            :cfgs="customPropertyCfgs"
            :default-group-name="path.basename(componentTag!)"
            :show-cfg-name="true"
            @update:cfg-value="handleCfgValueUpdate"
          />
        </div>
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
import { NModal, NSpace, NButton, NIcon, NTabs, NTabPane } from 'naive-ui';
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
import { App, Rect, ResizeEvent, UI, type IUI } from 'leafer-ui';
import * as _ from 'lodash-es';
import { registerTestUiClass } from '@mimic/custom/registrar';
import { mimicFileApi } from '@/service/api';
import PropertyConfig from './PropertyConfig.vue';
import type {
  CustomPropertyCfgs,
  DefaultAppearanceValues,
  UiCustomCfg,
} from '@mimic/custom/generator';
import CustomCfgPanel from '@mimic/components/CustomCfgPanel.vue';
import * as path from 'pathe';

const props = defineProps<{
  showModal?: boolean;
}>();

const mimicWorkspaceStatus = useMimicWorkspaceStatus();
let app: App | undefined = undefined;
let componentUi: IUI | undefined = undefined;

const componentTag = computed(() => {
  if (mimicWorkspaceStatus.currentTarget?.editorType === 'component') {
    return componentPathToTag(mimicWorkspaceStatus.currentTarget.path);
  }
  return null;
});

const componentJson = computed(() => {
  if (componentTag.value) {
    const componentJson = JSON.parse(mimicVar.componentJsonStrDict[componentTag.value]);
    return componentJson as any;
  }
  return {};
});

const newCustomPropertyCfgs = ref<CustomPropertyCfgs>();
const customPropertyCfgs = computed(() => {
  if (newCustomPropertyCfgs.value) {
    return newCustomPropertyCfgs.value;
  }
  if (componentJson.value.customPropertyCfgs) {
    return componentJson.value.customPropertyCfgs as CustomPropertyCfgs;
  }
  return [];
});

const newDefaultAppearanceValues = ref<DefaultAppearanceValues>();
const defaultAppearanceValues = computed<DefaultAppearanceValues>(() => {
  if (newDefaultAppearanceValues.value) return newDefaultAppearanceValues.value;
  if (componentJson.value.defaultAppearanceValues) {
    return componentJson.value.defaultAppearanceValues as DefaultAppearanceValues;
  }
  return {};
});

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

const isConfirmBtnDisabled = computed(() => {
  return (
    _.isEmpty(newDrawCode.value) &&
    _.isEmpty(newDrawHitPathCode.value) &&
    _.isEmpty(newHitCode.value) &&
    !newCustomPropertyCfgs.value &&
    !newDefaultAppearanceValues.value
  );
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
const newDrawHitPathCode = ref('');
function updateDrawHitPathCode(newCode: string) {
  newDrawHitPathCode.value = newCode;
}

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
const newHitCode = ref('');
function updateHitCode(newCode: string) {
  newHitCode.value = newCode;
}

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
  if (!_.isEmpty(newDrawHitPathCode.value)) {
    newComponentJson.drawHitPath = 'function(hitCanvas) {\n' + newDrawHitPathCode.value + '\n}';
  }
  if (!_.isEmpty(newHitCode.value)) {
    newComponentJson.hit = 'function(inner) {\n' + newHitCode.value + '\n}';
  }
  if (newCustomPropertyCfgs.value) {
    newComponentJson.customPropertyCfgs = newCustomPropertyCfgs.value;
  }
  if (newDefaultAppearanceValues.value) {
    newComponentJson.defaultAppearanceValues = newDefaultAppearanceValues.value;
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
    mimicVar.componentJsonStrDict[componentTag.value] = '';
    mimicVar.componentEditor.loadComponent(componentTag.value);
    eventBus.emitComponentUpdate(componentTag.value);
  }
}

function autofit() {
  app?.tree.zoom('fit', 10);
}

function setComponentUiProperty(propertyName: string, value: any) {
  if (componentUi?.proxyData) {
    componentUi.proxyData[propertyName] = value;
  }
}

function handleCfgValueUpdate(cfgName: string, cfgValue: string) {
  setComponentUiProperty(cfgName, cfgValue);
}

onMounted(() => {
  newDrawCode.value = '';
  nextTick(() => {
    app = new App({
      view: 'mimicComponentTestPreview',
      tree: {},
      editor: {},
      type: 'draw',
    });
    app.tree.on(ResizeEvent.RESIZE, () => autofit());
    if (componentTag.value) {
      const uiClass = getUiClassByTag(componentTag.value);

      if (uiClass) {
        componentUi = new uiClass({ x: 0, y: 0, draggable: false });
        app.tree.add(componentUi!);
        autofit();
      }
    }
  });
});

onUnmounted(() => {
  if (app) {
    app.destroy();
    app = undefined;
  }
});
</script>

<style scoped>
:deep(.fixed-code code) {
  padding: 0 10px;
}
:deep(.fixed-code pre) {
  border-radius: 0 !important;
}
</style>
