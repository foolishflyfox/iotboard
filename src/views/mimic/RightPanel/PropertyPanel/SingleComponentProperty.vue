<template>
  <div class="pr-10px">
    <!-- <div class="m-0.2em font-bold text-center">{{ curElementLabel }}</div> -->
    <!-- <div>{{ mimicDisplayStatus.selectedUiId }}</div> -->
    <NCollapse :default-expanded-names="['base', 'custom']">
      <NCollapseItem name="base">
        <template #header>
          <div class="font-bold">
            基础
          </div>
        </template>
        <template v-for="pt of curAppearancePropertyTypes" :key="pt">
          <CheckboxProperty v-if="pt === 'visible'" v-model:value="visible" label="可见" />
          <CheckboxProperty v-if="pt === 'editable'" v-model:value="editable" label="可选" />
          <NumberProperty
            v-else-if="pt === 'x'"
            v-model:value="x" label="X坐标" :decimal-places="3"
          />
          <NumberProperty
            v-else-if="pt === 'y'"
            v-model:value="y" label="Y坐标" :decimal-places="3"
          />
          <NumberProperty v-else-if="pt === 'width'" v-model:value="width" label="宽度" />
          <NumberProperty v-else-if="pt === 'height'" v-model:value="height" label="高度" />
          <NumberProperty v-else-if="pt === 'sides'" v-model:value="sides" label="边数" :min="3" />
          <template v-else-if="pt === 'stroke'">
            <!-- <template v-if="_.isString(stroke)">
              <ColorProperty v-model="stroke" label="边框颜色" />
            </template> -->
            <StrokeProperty :stroke="stroke" @update:value="v => (stroke = v)" />
          </template>
          <template v-else-if="pt === 'strokeWidth'">
            <NumberProperty
              v-if="stroke.type"
              v-model:value="strokeWidth" label="线宽" :min="0" :bindable="false"
            />
          </template>
          <template v-else-if="pt === 'fill'">
            <template v-if="_.isString(fill)">
              <ColorProperty v-model:value="fill" label="填充颜色" />
            </template>
          </template>
          <ArrowSelector
            v-else-if="pt === 'startArrow'"
            label="开始箭头"
            :is-start="true"
            v-model:value="startArrow"
          />
          <ArrowSelector
            v-else-if="pt === 'endArrow'"
            label="结束箭头"
            :is-start="false"
            v-model:value="endArrow"
          />
          <NumberProperty
            v-else-if="pt === 'cornerRadius'"
            v-model:value="cornerRadius"
            :min="0"
            label="圆角半径"
          />
          <DashPatternProperty v-else-if="pt === 'dashPattern'" v-model:value="dashPattern" />
          <StringProperty v-else-if="pt === 'text'" label="文本内容" v-model:value="text" />
          <NumberProperty
            v-else-if="pt === 'fontSize'"
            v-model:value="fontSize"
            :min="9"
            label="字体大小"
          />
          <CheckboxProperty v-else-if="pt === 'italic'" v-model:value="italic" label="斜体" />
          <FontWeightProperty v-else-if="pt === 'fontWeight'" v-model:value="fontWeight" />
          <TextDecorationProperty
            v-else-if="pt === 'textDecoration'"
            v-model:value="textDecoration"
          />
          <TextAlignProperty v-else-if="pt === 'textAlign'" v-model:value="textAlign" />
          <VerticalAlignProperty v-else-if="pt === 'verticalAlign'" v-model:value="verticalAlign" />
          <StrokeJoinSelector
            v-else-if="pt === 'strokeJoin'"
            label="拐角样式"
            v-model:value="strokeJoin"
          />
        </template>
      </NCollapseItem>

      <CustomCfgPanel
        :cfgs="customPropertyCfgs"
        :get-cfg-value
        :default-group-name="path.basename(mimicDisplayStatus.selectedUiProxyData?.tag)"
        @update:cfg-value="handleCfgValueUpdate"
      />
    </NCollapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui';
import NumberProperty from './components/NumberProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import StrokeProperty from './StrokeProperty.vue';
import * as _ from 'lodash-es';
import { UI, type IArrowType, type IPaintType, type IUI } from 'leafer-editor';
import { customCfgService, type CustomPropertyCfgs } from '@mimic/custom/generator';
import type { AppearanceType } from '@mimic/types';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import CustomCfgPanel from '@/views/mimic/RightPanel/CustomCfgPanel.vue';
import ArrowSelector from './ArrowSelector.vue';
import * as path from 'pathe';
import DashPatternProperty from './DashPatternProperty.vue';
import FontWeightProperty from './FontWeightProperty.vue';
import CheckboxProperty from './components/CheckboxProperty.vue';
import TextDecorationProperty from './TextDecorationProperty.vue';
import TextAlignProperty from './TextAlignProperty.vue';
import VerticalAlignProperty from './VerticalAlignProperty.vue';
import StringProperty from './components/StringProperty.vue';
import StrokeJoinSelector from './StrokeJoinSelector.vue';
import type { ActionItem } from '@mimic/global/action-manager';

const mimicDisplayStatus = useMimicDisplayStatus();
const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const curAppearancePropertyTypes = computed(() => {
  let result: AppearanceType[] = [];
  const uiCustomCfg = customCfgService.getUiCustomCfg(mimicDisplayStatus.selectedUiProxyData?.tag);
  if (uiCustomCfg?.appearanceTypes) {
    result = uiCustomCfg.appearanceTypes;
  }
  return result;
});

function useAttrProxy(attrName: string, customSetter?: (v: any) => void) {
  return computed({
    get: () => mimicDisplayStatus.selectedUiProxyData?.[attrName],
    set: (v: any) => {
      const actionItem: ActionItem = {
        type: 'set',
        uiId: mimicDisplayStatus.selectedUiId as string,
        attrName,
        oldValue: mimicDisplayStatus.selectedUiProxyData![attrName],
        newValue: v
      };
      if (customSetter) {
        customSetter(v);
      } else {
        mimicDisplayStatus.selectedUiProxyData![attrName] = v;
      }
      const actionManager = mimicVar.actionManagerContainer.getManager();
      actionManager?.addAction([actionItem]);
      // 设置图纸为未保存
      mimicWorkspaceStatus.setCurrentDisplayUnsave();
    }
  });
}

interface Stroke extends Record<string, any> {
  type: IPaintType;
}

const visible = useAttrProxy('visible');
const editable = useAttrProxy('editable');
const x = useAttrProxy('x');
const y = useAttrProxy('y');
const width = useAttrProxy('width');
const height = useAttrProxy('height');
const sides = useAttrProxy('sides');
const stroke = useAttrProxy('stroke');
const strokeWidth = useAttrProxy('strokeWidth');
const fill = useAttrProxy('fill');
const startArrow = useAttrProxy('startArrow', (v: IArrowType) => {
  mimicDisplayStatus.selectedUiProxyData!.startArrow = v;
  (mimicDisplayStatus.curUi as IUI).forceUpdate();
});
const endArrow = useAttrProxy('endArrow', (v: IArrowType) => {
  mimicDisplayStatus.selectedUiProxyData!.endArrow = v;
  // 存在修改了样式后，canvas 中绘制的样式没有变化的情况
  // (startArrow 和 endArrow 中的第一个修改生效，第二个修改不生效)
  (mimicDisplayStatus.curUi as IUI).forceUpdate();
});
const cornerRadius = useAttrProxy('cornerRadius');
const dashPattern = useAttrProxy('dashPattern');
const text = useAttrProxy('text');
const fontSize = useAttrProxy('fontSize');
const fontWeight = useAttrProxy('fontWeight');
const italic = useAttrProxy('italic');
const textDecoration = useAttrProxy('textDecoration');
const textAlign = useAttrProxy('textAlign');
const verticalAlign = useAttrProxy('verticalAlign');
const strokeJoin = useAttrProxy('strokeJoin');

const componentJson = computed(() => {
  if (mimicDisplayStatus.curUi instanceof UI) {
    let json: any = {};
    if (mimicVar.componentJsonStrDict[mimicDisplayStatus.curUi.tag]) {
      json = JSON.parse(mimicVar.componentJsonStrDict[mimicDisplayStatus.curUi.tag]);
    } else if (mimicDisplayStatus.curUi.tag?.startsWith('element:')) {
      json = customCfgService.getUiCustomCfg(mimicDisplayStatus.selectedUiProxyData?.tag) || {};
    }
    return json;
  } else {
    return {};
  }
});
const customPropertyCfgs = computed(() => {
  return (componentJson.value.customPropertyCfgs as CustomPropertyCfgs) || [];
});

function handleCfgValueUpdate(cfgName: string, cfgValue: string) {
  mimicDisplayStatus.selectedUiProxyData![cfgName] = cfgValue;
}

function getCfgValue(cfgName: string): any {
  return mimicDisplayStatus.selectedUiProxyData?.[cfgName];
}

watch([() => mimicDisplayStatus.selectedUiId, x, y, width, height], (nv, ov) => {
  if (nv[0] === ov[0]) {
    mimicWorkspaceStatus.setCurrentDisplayUnsave();
  }
});
</script>

<style scoped>
:deep(.n-collapse-item__content-inner) {
  padding-top: 6px !important;
}
.n-collapse-item {
  margin: 0 !important;
}
</style>
