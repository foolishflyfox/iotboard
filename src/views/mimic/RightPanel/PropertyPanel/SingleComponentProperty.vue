<template>
  <div>
    <!-- <div class="m-0.2em font-bold text-center">{{ curElementLabel }}</div> -->
    <n-collapse :default-expanded-names="['base', 'custom']">
      <n-collapse-item name="base">
        <template #header>
          <div class="font-bold">基础</div>
        </template>
        <template v-for="pt of curAppearancePropertyTypes" :key="pt">
          <NumberProperty v-model:value="x" label="X坐标" v-if="pt === 'x'" />
          <NumberProperty v-else-if="pt === 'y'" v-model:value="y" label="Y坐标" />
          <NumberProperty v-else-if="pt === 'width'" v-model:value="width" label="宽度" />
          <NumberProperty v-else-if="pt === 'height'" v-model:value="height" label="高度" />
          <template v-else-if="pt === 'stroke'">
            <!-- <template v-if="_.isString(stroke)">
              <ColorProperty v-model="stroke" label="边框颜色" />
            </template> -->
            <StrokeProperty :stroke="stroke" @update:value="v => (stroke = v)" />
          </template>
          <template v-else-if="pt === 'fill'">
            <template v-if="_.isString(fill)">
              <ColorProperty v-model="fill" label="填充颜色" />
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
            label="圆角半径"
          />
        </template>
      </n-collapse-item>

      <CustomCfgPanel
        :cfgs="customPropertyCfgs"
        :default-group-name="path.basename(curElementProxyData?.tag)"
        @update:cfg-value="handleCfgValueUpdate"
      />
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui';
import { useCurElementProxyData } from '@mimic/hooks';
import NumberProperty from './components/NumberProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import StrokeProperty from './StrokeProperty.vue';
import * as _ from 'lodash-es';
import { UI, type IArrowType, type IPaint, type IPaintType, type IUI } from 'leafer-ui';
import { customCfgService, type CustomPropertyCfgs } from '@mimic/custom/generator';
import type { AppearanceType } from '@mimic/types';
import { useMimicDisplayStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import CustomCfgPanel from '@mimic/components/CustomCfgPanel.vue';
import ArrowSelector from './ArrowSelector.vue';
import * as path from 'pathe';

const mimicDisplayStatus = useMimicDisplayStatus();
const curElementProxyData = useCurElementProxyData();

const curAppearancePropertyTypes = computed(() => {
  let result: AppearanceType[] = [];
  const uiCustomCfg = customCfgService.getUiCustomCfg(curElementProxyData.value?.tag!);
  console.log('###', uiCustomCfg);
  if (uiCustomCfg?.appearanceTypes) {
    result = uiCustomCfg.appearanceTypes;
  }
  return result;
});

const x = computed({
  get: () => curElementProxyData.value?.x,
  set: (v: number) => (curElementProxyData.value!.x = v),
});

const y = computed({
  get: () => curElementProxyData.value?.y,
  set: (v: number) => (curElementProxyData.value!.y = v),
});
const width = computed({
  get: () => curElementProxyData.value?.width,
  set: (v: number) => (curElementProxyData.value!.width = v),
});
const height = computed({
  get: () => curElementProxyData.value?.height,
  set: (v: number) => (curElementProxyData.value!.height = v),
});
interface Stroke extends Record<string, any> {
  type: IPaintType;
}
const stroke = computed({
  get: () => curElementProxyData.value?.stroke as IPaint,
  set: (v: Stroke) => (curElementProxyData.value!.stroke = v as any),
});
const fill = computed({
  get: () => curElementProxyData.value?.fill,
  set: (v: string) => (curElementProxyData.value!.fill = v),
});
const startArrow = computed({
  get: () => curElementProxyData.value!.startArrow as any,
  set: (v: IArrowType) => {
    curElementProxyData.value!.startArrow = v;
    (mimicDisplayStatus.curUi as IUI).forceUpdate();
  },
});
const endArrow = computed({
  get: () => curElementProxyData.value?.endArrow as any,
  set: (v: IArrowType) => {
    curElementProxyData.value!.endArrow = v;
    // 存在修改了样式后，canvas 中绘制的样式没有变化的情况
    // (startArrow 和 endArrow 中的第一个修改生效，第二个修改不生效)
    (mimicDisplayStatus.curUi as IUI).forceUpdate();
  },
});
const cornerRadius = computed({
  get: () => curElementProxyData.value!.cornerRadius as number,
  set: (v: number) => {
    curElementProxyData.value!.cornerRadius = v;
  },
});

const componentJson = computed(() => {
  if (mimicDisplayStatus.curUi instanceof UI) {
    let json: any = {};
    if (mimicVar.componentJsonStrDict[mimicDisplayStatus.curUi.tag]) {
      json = JSON.parse(mimicVar.componentJsonStrDict[mimicDisplayStatus.curUi.tag]);
    } else if (mimicDisplayStatus.curUi.tag === 'Line') {
      // 选中的是折线
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
  curElementProxyData.value![cfgName] = cfgValue;
}
</script>

<style scoped>
:deep(.n-collapse-item__content-inner) {
  padding-top: 6px !important;
}
.n-collapse-item {
  margin: 0 !important;
}
</style>
