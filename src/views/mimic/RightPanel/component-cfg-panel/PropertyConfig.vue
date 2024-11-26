<template>
  <div class="flex-col h-full">
    <div v-if="false">
      <n-divider>通用属性</n-divider>
      <div>通用属性(多选框)，默认 x/y/width/height</div>
    </div>
    <div class="flex-1 flex-col">
      <n-divider>自定义属性</n-divider>
      <!-- <div>自定义属性配置，是否导出/类型</div> -->
      <div class="mx-10px my-5px">
        <n-space>
          <icon-button :icon="Add12Filled" size="tiny" @click="() => clickAddCfg()" />
        </n-space>
      </div>
      <div class="flex-1">
        <n-table :single-line="false" size="small">
          <thead>
            <tr>
              <th>属性</th>
              <th>名称</th>
              <th class="w-3em">可配置</th>
              <th>类型</th>
              <th>默认值</th>
              <th>组</th>
              <th class="w-110px text-center!">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cfg of innerCfgs" :key="cfg.id">
              <td>{{ cfg.name }}</td>
              <td>{{ cfg.label }}</td>
              <td><n-checkbox class="ml-1em" /></td>
              <td>{{ cfg.type }}</td>
              <td>{{ cfg.defaultValue }}</td>
              <td>{{ cfg.group }}</td>
              <td>
                <n-space justify="center" :size="[1, 0]">
                  <icon-button
                    type="error"
                    text
                    :icon="Delete24Filled"
                    @click="() => clickRemoveCfg(cfg)"
                  />
                  <icon-button
                    type="primary"
                    text
                    :icon="NotepadEdit20Filled"
                    @click="() => clickEditCfg(cfg)"
                  />
                  <!-- </n-space>
                <n-space size="small" justify="center"> -->
                  <icon-button text :icon="ArrowUpload16Filled" size="tiny" />
                  <icon-button text :icon="ArrowUp16Filled" size="tiny" />
                  <icon-button text :icon="ArrowDown16Filled" size="tiny" />
                  <icon-button text :icon="ArrowDownload16Filled" size="tiny" />
                </n-space>
              </td>
            </tr>
          </tbody>
        </n-table>
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
  >
    <n-space vertical class="my-20px">
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">属性:</span>
        <n-input
          class="flex-1"
          size="small"
          :value="toEditCfg?.name"
          @update:value="v => (toEditCfg!.name = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">名称:</span>
        <n-input
          class="flex-1"
          size="small"
          :value="toEditCfg?.label"
          @update:value="v => (toEditCfg!.label = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">可配置:</span>
        <div class="flex-1">
          <n-checkbox
            :checked="toEditCfg?.variable"
            @update:checked="v => (toEditCfg!.variable = v)"
          />
        </div>
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">类型:</span>
        <!-- <n-input class="flex-1" size="small" /> -->
        <n-select
          class="flex-1"
          size="small"
          :options="cfgTypeOptions"
          :value="toEditCfg?.type"
          @update:value="v => (toEditCfg!.type = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">默认值:</span>
        <n-input
          class="flex-1"
          size="small"
          :value="String(toEditCfg?.defaultValue)"
          @update:value="v => (toEditCfg!.defaultValue = v)"
        />
      </div>
      <div class="cfg-edit-item flex justify-center">
        <span class="w-60px">组:</span>
        <n-input
          class="flex-1"
          size="small"
          :value="toEditCfg?.group"
          @update:value="v => (toEditCfg!.group = v)"
        />
      </div>
    </n-space>
  </QueryDialog>
</template>

<script setup lang="ts">
import { NDivider, NTable, NCheckbox, NSpace, NInput, NSelect, type SelectOption } from 'naive-ui';
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
import type { CustomPropertyCfg, CustomPropertyCfgs } from '@mimic/custom/generator';
import QueryDialog from '@/components/QueryDialog.vue';
import { getUniqueId } from '@/utils';
import * as _ from 'lodash-es';

const props = defineProps<{
  customPropertyCfgs: CustomPropertyCfgs;
}>();

const innerCfgs = ref(_.cloneDeep(props.customPropertyCfgs));

const emit = defineEmits<{
  'update:cfgs': [CustomPropertyCfgs];
}>();

const showDeleteCfgModal = ref(false);
const toDeleteCfg = ref<CustomPropertyCfg>();
function clickRemoveCfg(cfg: CustomPropertyCfg) {
  toDeleteCfg.value = cfg;
  showDeleteCfgModal.value = true;
}
function deleteCfg() {
  console.log('删除配置: id =', toDeleteCfg.value?.id);
  _.pull(innerCfgs.value, toDeleteCfg.value);
  toDeleteCfg.value = undefined;
  emit('update:cfgs', innerCfgs.value!);
}

const cfgModalType = ref<'add' | 'edit'>();
const cfgModalTitle = ref('');
watch(cfgModalType, nv => {
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
