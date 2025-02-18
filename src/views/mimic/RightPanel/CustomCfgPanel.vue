<template>
  <div>
    <NCollapse :default-expanded-names="_.keys(groupedCfgs)">
      <NCollapseItem v-for="groupName of _.keys(groupedCfgs)" :name="groupName" :key="groupName">
        <template #header>
          <div class="font-bold">
            {{ groupName || defaultGroupName || '默认' }}
          </div>
        </template>
        <NSpace vertical :size="0">
          <template v-for="cfg of groupedCfgs[groupName]" :key="cfg.id">
            <template v-if="cfg.variable">
              <StringProperty
                v-if="cfg.type === 'string' && cfgVisible[cfg.name] !== false"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <NumberProperty
                v-else-if="cfg.type === 'number'"
                :label="generateCfgLabel(cfg)"
                :value="Number(getCfgValue?.(cfg.name))"
                :min="Number(cfg.extra?.min)"
                :max="Number(cfg.extra?.max)"
                :step="cfg.extra?.step"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <ColorProperty
                v-else-if="cfg.type === 'color'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <CheckboxProperty
                v-else-if="cfg.type === 'checkbox'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <JsonInputProperty
                v-else-if="cfg.type === 'jsonInput'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <TextAlignProperty
                v-else-if="cfg.type === 'textAlign'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <VerticalAlignProperty
                v-else-if="cfg.type === 'textVerticalAlign'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <FontWeightProperty
                v-else-if="cfg.type === 'textFontWeight'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <TextDecorationProperty
                v-else-if="cfg.type === 'textDecoration'"
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
              <SvgColorProperty v-else-if="cfg.type === 'svgColorEditor'" />
              <StringProperty
                v-else
                :label="generateCfgLabel(cfg)"
                :value="getCfgValue?.(cfg.name)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
            </template>
          </template>
        </NSpace>
      </NCollapseItem>
    </NCollapse>
  </div>
</template>

<script setup lang="ts">
import {
  type CustomPropertyCfg,
  type CustomPropertyCfgs,
  groupCustomPropertyCfgs,
} from '@mimic/custom/generator';
import { NCollapse, NCollapseItem, NSpace } from 'naive-ui';
import * as _ from 'lodash-es';
import { ColorProperty } from './PropertyPanel/components';
import StringProperty from './PropertyPanel/components/StringProperty.vue';
import JsonInputProperty from './PropertyPanel/components/JsonInputProperty.vue';
import TextAlignProperty from './PropertyPanel/TextAlignProperty.vue';
import VerticalAlignProperty from './PropertyPanel/VerticalAlignProperty.vue';
import NumberProperty from './PropertyPanel/components/NumberProperty.vue';
import FontWeightProperty from './PropertyPanel/FontWeightProperty.vue';
import TextDecorationProperty from './PropertyPanel/TextDecorationProperty.vue';
import CheckboxProperty from './PropertyPanel/components/CheckboxProperty.vue';
import SvgColorProperty from './PropertyPanel/SvgColorProperty.vue';
import { emitter } from '@/utils';

const props = defineProps<{
  cfgs: CustomPropertyCfgs;
  /** 是否显示属性名 */
  showCfgName?: boolean;
  getCfgValue?: (cfgName: string) => any;
  defaultGroupName?: string;
}>();

const emit = defineEmits<{
  'update:cfgValue': [cfgName: string, cfgValue: any];
}>();

const groupedCfgs = computed(() => groupCustomPropertyCfgs(props.cfgs));

const cfgVisible = ref<Record<string, boolean>>({});
function updateCfg(attrName: string) {
  cfgVisible.value[attrName] = false;
  nextTick(() => {
    cfgVisible.value[attrName] = true;
  });
}

function cfgValueUpdate(cfgName: string, v: any) {
  emit('update:cfgValue', cfgName, v);
}

function generateCfgLabel(cfg: CustomPropertyCfg) {
  if (!cfg.label) return cfg.name;
  if (props.showCfgName) return `(${cfg.name})${cfg.label}`;
  return cfg.label;
}

onMounted(() => {
  emitter.on('mimicUpdateAttr', updateCfg);
});

onUnmounted(() => {
  emitter.off('mimicUpdateAttr', updateCfg);
});
</script>

<style scoped>
@import '@mimic/RightPanel/PropertyPanel/components/property-item.css';

:deep(.n-collapse-item__content-inner) {
  padding-top: 6px !important;
}
.n-collapse-item {
  margin: 0 !important;
}
</style>
