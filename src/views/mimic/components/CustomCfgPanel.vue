<template>
  <div>
    <n-collapse :default-expanded-names="_.keys(groupedCfgs)">
      <n-collapse-item v-for="groupName of _.keys(groupedCfgs)" :name="groupName">
        <template #header>
          <div class="font-bold">{{ groupName || defaultGroupName || '默认' }}</div>
        </template>
        <n-space vertical :size="2">
          <template v-for="cfg of groupedCfgs[groupName]">
            <div class="kv-property flex-y-center" v-if="cfg.variable">
              <span
                :title="generateCfgLabel(cfg)"
                class="font-semibold ellipsis-text cursor-default property-label"
              >
                {{ generateCfgLabel(cfg) }}
              </span>
              <CfgInput
                class="flex-1"
                :value="String(getCfgValue?.(cfg.name) || cfg.defaultValue)"
                @update:value="v => cfgValueUpdate(cfg.name, v!)"
              />
            </div>
          </template>
        </n-space>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import {
  type CustomPropertyCfg,
  type CustomPropertyCfgs,
  groupCustomPropertyCfgs,
} from '@mimic/custom/generator';
import { NCollapse, NCollapseItem, NSpace, NInput } from 'naive-ui';
import * as _ from 'lodash-es';
import { CfgInput } from '@/components';

const props = defineProps<{
  cfgs: CustomPropertyCfgs;
  /** 是否显示属性名 */
  showCfgName?: boolean;
  getCfgValue?: (cfgName: string) => any;
  defaultGroupName?: string;
}>();

const emit = defineEmits<{
  'update:cfgValue': [cfgName: string, cfgValue: string];
}>();

const groupedCfgs = computed(() => groupCustomPropertyCfgs(props.cfgs));

function cfgValueUpdate(cfgName: string, v: string) {
  emit('update:cfgValue', cfgName, v);
}

function generateCfgLabel(cfg: CustomPropertyCfg) {
  if (!cfg.label) return cfg.name;
  if (props.showCfgName) return `(${cfg.name})${cfg.label}`;
  return cfg.label;
}
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
