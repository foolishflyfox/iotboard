<template>
  <div>
    <n-collapse :default-expanded-names="_.keys(groupedCfgs)">
      <n-collapse-item v-for="groupName of _.keys(groupedCfgs)" :name="groupName">
        <template #header>
          <div>{{ groupName || defaultGroupName || '默认' }}</div>
        </template>
        <n-space vertical :size="2">
          <template v-for="cfg of groupedCfgs[groupName]">
            <div class="px-5px kv-property flex-y-center" v-if="cfg.variable">
              <span
                :title="generateCfgLabel(cfg)"
                class="font-semibold ellipsis-text cursor-default property-label"
              >
                {{ generateCfgLabel(cfg) }}
              </span>
              <!-- <span class="mr-10px ml-5px">:</span> -->
              <n-input
                class="flex-1"
                size="small"
                :value="cfgValueCache[cfg.name]"
                @update:value="v => (cfgValueCache[cfg.name] = v)"
                @keydown.stop="e => cfgValueInputKeyDown(e, cfg.name)"
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
import { keyboardKeys } from '@/constant';

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

function cfgValueInputKeyDown(e: KeyboardEvent, cfgName: string) {
  if (e.key === keyboardKeys.Enter || e.key === keyboardKeys.Tab) {
    cfgValueUpdate(cfgName);
    if (e.target) {
      (e.target as HTMLElement).blur();
    }
  }
}

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
@import '@mimic/RightPanel/PropertyPanel/components/property-item.css';

:deep(.n-collapse-item__content-inner) {
  padding-top: 6px !important;
}
.n-collapse-item {
  margin: 0 !important;
}
</style>
