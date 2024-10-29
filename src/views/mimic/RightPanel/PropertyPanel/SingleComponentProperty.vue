<template>
  <!-- <div>单文件配置: {{ mimicWorkspaceStatus.selectedUiId }}</div> -->
  <div>
    <n-collapse :default-expanded-names="['base', 'custom']">
      <n-collapse-item title="基础" name="base">
        <template v-for="pt of curAppearancePropertyTypes" :key="pt">
          <NumberProperty v-model="x" label="X坐标" v-if="pt === 'x'" />
          <NumberProperty v-else-if="pt === 'y'" v-model="y" label="Y坐标" />
          <NumberProperty v-else-if="pt === 'width'" v-model="width" label="宽度" />
          <NumberProperty v-else-if="pt === 'height'" v-model="height" label="高度" />
          <template v-else-if="pt === 'stroke'">
            <!-- <template v-if="_.isString(stroke)">
              <ColorProperty v-model="stroke" label="边框颜色" />
            </template> -->
            <StrokeProperty
              :type="stroke.type"
              :color="stroke.color"
              @update:value="v => (stroke = v)"
            />
          </template>
          <template v-else-if="pt === 'fill'">
            <template v-if="_.isString(fill)">
              <ColorProperty v-model="fill" label="填充颜色" />
            </template>
          </template>
        </template>
      </n-collapse-item>
      <n-collapse-item title="自定义" name="custom"> 自定义外观 </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui';
import { useCurElementProxyData } from '@mimic/hooks';
import { customMetas } from '@mimic/utils';
import NumberProperty from './components/NumberProperty.vue';
import ColorProperty from './components/ColorProperty.vue';
import StrokeProperty from './StrokeProperty.vue';
import * as _ from 'lodash-es';
import type { IPaintType } from 'leafer-ui';

// const mimicWorkspaceStatus = useMimicWorkspaceStatus();

const curElementProxyData = useCurElementProxyData();
const curAppearancePropertyTypes = computed(
  () => customMetas[curElementProxyData.value?.tag || '']?.appearancePropertyTypes,
);

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
  get: () => curElementProxyData.value?.stroke as Stroke,
  set: (v: Stroke) => (curElementProxyData.value!.stroke = v as any),
});
const fill = computed({
  get: () => curElementProxyData.value?.fill,
  set: (v: string) => (curElementProxyData.value!.fill = v),
});
</script>

<style scoped></style>
