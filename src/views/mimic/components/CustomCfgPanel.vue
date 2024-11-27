<template>
  <div>
    <n-collapse :default-expanded-names="_.keys(groupedCfgs)">
      <n-collapse-item v-for="groupName of _.keys(groupedCfgs)" :name="groupName">
        <template #header>
          <div class="font-bold">{{ groupName || defaultGroupName || '默认' }}</div>
        </template>
        <n-space vertical :size="2">
          <template v-for="cfg of groupedCfgs[groupName]">
            <div
              class="px-5px border-gray-300 pb-3px border-b-1px flex-y-center"
              v-if="cfg.variable"
            >
              <span
                :title="generateCfgLabel(cfg)"
                class="font-semibold w-100px text-right ellipsis-text cursor-default"
              >
                {{ generateCfgLabel(cfg) }}
              </span>
              <span class="mr-10px ml-5px">:</span>
              <n-input
                class="flex-1"
                size="small"
                :value="cfgValueCache[cfg.name]"
                @update:value="v => (cfgValueCache[cfg.name] = v)"
                @keydown.enter="() => cfgValueUpdate(cfg.name)"
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
import { NCollapse, NCollapseItem, NSpace, NTable, NInput } from 'naive-ui';
import * as _ from 'lodash-es';

const props = defineProps<{
  cfgs: CustomPropertyCfgs;
  /** 是否显示属性名 */
  showCfgName?: boolean;
  defaultGroupName?: string;
}>();

const emit = defineEmits<{
  'update:cfgValue': [cfgName: string, cfgValue: string];
}>();

const groupedCfgs = computed(() => groupCustomPropertyCfgs(props.cfgs));
const cfgValueCache = ref<Record<string, string>>({});
props.cfgs.forEach(e => (cfgValueCache.value[e.name] = String(e.defaultValue)));

function cfgValueUpdate(cfgName: string) {
  // console.log(`修改 ${cfgName} 值为`, cfgValueCache.value[cfgName]);
  emit('update:cfgValue', cfgName, cfgValueCache.value[cfgName]);
}

function generateCfgLabel(cfg: CustomPropertyCfg) {
  if (!cfg.label) return cfg.name;
  if (props.showCfgName) return `(${cfg.name})${cfg.label}`;
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
