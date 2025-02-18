<template>
  <div class="flex-col h-full">
    <div v-if="false">
      <NDivider>通用属性</NDivider>
      <div>通用属性(多选框)，默认 x/y/width/height</div>
    </div>
    <div class="flex-1 flex-col">
      <NDivider>外观属性</NDivider>
      <NSpace size="small" vertical>
        <div class="flex-y-center">
          <span class="mr-10px">宽度:</span>
          <NInputNumber
            size="small"
            :value="innerAppearanceValues.width"
            @update:value="v => updateAppearanceValue('width', v)"
          />
        </div>
        <div class="flex-y-center">
          <span class="mr-10px">高度:</span>
          <NInputNumber
            size="small"
            :value="innerAppearanceValues.height"
            @update:value="v => updateAppearanceValue('height', v)"
          />
        </div>
      </NSpace>
      <NDivider>自定义属性</NDivider>
      <!-- <div>自定义属性配置，是否导出/类型</div> -->
      <div class="mx-10px my-5px">
        <NSpace>
          <IconButton :icon="Add12Filled" size="tiny" @click="() => clickAddCfg()" />
        </NSpace>
      </div>
      <div class="flex-1">
        <NTable :single-line="false" size="small">
          <thead>
            <tr>
              <th>属性</th>
              <th>名称</th>
              <th class="w-3em">
                可配置
              </th>
              <th>类型</th>
              <th>默认值</th>
              <th>组</th>
              <th class="w-110px text-center!">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cfg of innerCfgs" :key="cfg.id">
              <td>{{ cfg.name }}</td>
              <td>{{ cfg.label }}</td>
              <td>
                <NCheckbox
                  class="ml-1em"
                  :checked="cfg.variable"
                  @update:checked="
                    v => {
                      cfg.variable = v;
                      emit('update:cfgs', innerCfgs);
                    }
                  "
                />
              </td>
              <td>{{ getCfgTypeLabelByValue(cfg.type) }}</td>
              <td>{{ cfg.defaultValue }}</td>
              <td>{{ cfg.group }}</td>
              <td>
                <NSpace justify="center" :size="[1, 0]">
                  <IconButton
                    type="error"
                    text
                    :icon="Delete24Filled"
                    @click="() => clickRemoveCfg(cfg)"
                  />
                  <IconButton
                    type="primary"
                    text
                    :icon="NotepadEdit20Filled"
                    @click="() => clickEditCfg(cfg)"
                  />
                  <!-- </n-space>
                <n-space size="small" justify="center"> -->
                  <IconButton text :icon="ArrowUpload16Filled" size="tiny" />
                  <IconButton text :icon="ArrowUp16Filled" size="tiny" />
                  <IconButton text :icon="ArrowDown16Filled" size="tiny" />
                  <IconButton text :icon="ArrowDownload16Filled" size="tiny" />
                </NSpace>
              </td>
            </tr>
          </tbody>
        </NTable>
      </div>
    </div>
  </div>
  <QueryDialog
    title="删除"
    type="warning"
    @positive-click="deleteCfg"
    v-model:show-modal="showDeleteCfgModal"
  >
    <div>
      确定删除属性 <strong>{{ toDeleteCfg?.name }} ?</strong>
    </div>
  </QueryDialog>
  <QueryDialog
    :title="cfgModalTitle"
    :show-modal="!!cfgModalType"
    @update:show-modal="v => (cfgModalType = v ? cfgModalType : undefined)"
    @positive-click="confirmCfgEdit"
  >
    <NSpace vertical class="my-20px">
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">属性:</span>
        <NInput
          class="flex-1"
          size="small"
          :value="toEditCfg?.name"
          @update:value="v => (toEditCfg!.name = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">名称:</span>
        <NInput
          class="flex-1"
          size="small"
          :value="toEditCfg?.label"
          @update:value="v => (toEditCfg!.label = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">可配置:</span>
        <div class="flex-1">
          <NCheckbox
            :checked="toEditCfg?.variable"
            @update:checked="v => (toEditCfg!.variable = v)"
          />
        </div>
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">类型:</span>
        <!-- <n-input class="flex-1" size="small" /> -->
        <NSelect
          class="flex-1"
          size="small"
          :options="cfgTypeOptions"
          :value="toEditCfg?.type"
          @update:value="v => (toEditCfg!.type = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">默认值:</span>
        <NInput
          class="flex-1"
          size="small"
          :value="String(toEditCfg?.defaultValue)"
          @update:value="v => (toEditCfg!.defaultValue = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">组:</span>
        <NInput
          class="flex-1"
          size="small"
          :value="toEditCfg?.group"
          @update:value="v => (toEditCfg!.group = v)"
        />
      </div>
    </NSpace>
  </QueryDialog>
</template>

<script setup lang="ts">
import {
  NDivider,
  NTable,
  NCheckbox,
  NSpace,
  NInput,
  NSelect,
  NInputNumber,
  type SelectOption,
} from 'naive-ui';
import {
  Add12Filled,
  Delete24Filled,
  NotepadEdit20Filled,
  ArrowUpload16Filled,
  ArrowDownload16Filled,
  ArrowUp16Filled,
  ArrowDown16Filled,
} from '@vicons/fluent';
import { IconButton } from '@/components';
import type {
  CustomPropertyCfg,
  CustomPropertyCfgs,
  DefaultAppearanceValues,
} from '@mimic/custom/generator';
import QueryDialog from '@/components/QueryDialog.vue';
import { getUniqueId } from '@/utils';
import * as _ from 'lodash-es';
import type { AppearanceType } from '@mimic/types';

const props = defineProps<{
  customPropertyCfgs: CustomPropertyCfgs;
  defaultAppearanceValues: DefaultAppearanceValues;
}>();

const emit = defineEmits<{
  'update:cfgs': [CustomPropertyCfgs];
  'update:appearanceValues': [DefaultAppearanceValues];
}>();
const innerCfgs = ref(_.cloneDeep(props.customPropertyCfgs));
const innerAppearanceValues = ref(_.cloneDeep(props.defaultAppearanceValues));

function updateAppearanceValue(key: AppearanceType, value: any) {
  innerAppearanceValues.value[key] = value;
  emit('update:appearanceValues', innerAppearanceValues.value);
}

const showDeleteCfgModal = ref(false);
const toDeleteCfg = ref<CustomPropertyCfg>();
function clickRemoveCfg(cfg: CustomPropertyCfg) {
  toDeleteCfg.value = cfg;
  showDeleteCfgModal.value = true;
}
function deleteCfg() {
  _.pull(innerCfgs.value, toDeleteCfg.value);
  toDeleteCfg.value = undefined;
  emit('update:cfgs', innerCfgs.value!);
}

const cfgModalType = ref<'add' | 'edit'>();
const cfgModalTitle = ref('');
watch(cfgModalType, (nv) => {
  let newTitle = '';
  if (nv === 'add') newTitle = '新增';
  if (nv === 'edit') newTitle = '编辑';
  if (!newTitle) setTimeout(() => (cfgModalTitle.value = newTitle), 300);
  else cfgModalTitle.value = newTitle;
});
const toEditCfg = ref<CustomPropertyCfg>();
function clickEditCfg(cfg: CustomPropertyCfg) {
  toEditCfg.value = { ...cfg };
  cfgModalType.value = 'edit';
}
function confirmCfgEdit() {
  const target = _.find(innerCfgs.value, e => e.id === toEditCfg.value?.id);
  if (target) {
    _.assign(target, toEditCfg.value);
    emit('update:cfgs', innerCfgs.value);
  } else {
    innerCfgs.value.push({ ...toEditCfg.value! });
    emit('update:cfgs', innerCfgs.value);
  }
}
function clickAddCfg() {
  toEditCfg.value = {
    id: getUniqueId(),
    name: '',
    label: '',
    variable: true,
    type: 'string',
    defaultValue: '',
    group: '',
  };
  cfgModalType.value = 'add';
}

const cfgTypeOptions: SelectOption[] = [
  {
    label: '字符串',
    value: 'string',
  },
  {
    label: '数字',
    value: 'number',
  },
  {
    label: '颜色',
    value: 'color',
  },
];
function getCfgTypeLabelByValue(value: string) {
  return _.find(cfgTypeOptions, e => e.value === value)?.label || '';
}
</script>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0;
  margin-bottom: 0;
}
div.cfg-edit-item > span {
  font-weight: bold;
}
</style>
