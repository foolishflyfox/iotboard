<template>
  <div>
    <n-collapse :default-expanded-names="_.keys(groupedCfgs)">
      <n-collapse-item v-for="groupName of _.keys(groupedCfgs)" :name="groupName">
        <template #header>
          <div class="font-bold">{{ groupName || defaultGroupName || '默认' }}</div>
        </template>
        <n-space vertical :size="2">
          <template v-for="cfg of groupedCfgs[groupName]">
            <div class="px-5px border-gray-300 border-b-1px" v-if="cfg.variable">
              <span class="font-semibold">{{ generateCfgLabel(cfg) }}:</span>
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
import { NCollapse, NCollapseItem, NSpace, NTable } from 'naive-ui';
import * as _ from 'lodash-es';

const props = defineProps<{
  cfgs: CustomPropertyCfgs;
  /** 是否显示属性名 */
  showCfgName?: boolean;
  defaultGroupName?: string;
}>();

const groupedCfgs = computed(() => groupCustomPropertyCfgs(props.cfgs));

function generateCfgLabel(cfg: CustomPropertyCfg) {
  if (!cfg.label) return cfg.name;
  if (props.showCfgName) return `${cfg.label}(${cfg.name})`;
  return cfg.label;
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
