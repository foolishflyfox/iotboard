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
          <icon-button :icon="Add12Filled" size="tiny" />
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
            <tr v-for="cfg of customPropertyCfgs" :key="cfg.id">
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
  <QueryDialog title="删除" type="warning" v-model:show-modal="showDeleteCfgModal">
    <div>
      确定删除属性 <strong>{{ toDeleteCfg?.name }} ?</strong>
    </div>
  </QueryDialog>
  <QueryDialog title="编辑" v-model:show-modal="showEditCfgModal">
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
        <span class="w-60px">类型:</span>
        <n-input class="flex-1" size="small" />
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
import { NDivider, NTable, NCheckbox, NSpace, NInput } from 'naive-ui';
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

defineProps<{
  customPropertyCfgs: CustomPropertyCfgs;
}>();

const showDeleteCfgModal = ref(false);
const toDeleteCfg = ref<CustomPropertyCfg>();
function clickRemoveCfg(cfg: CustomPropertyCfg) {
  toDeleteCfg.value = cfg;
  showDeleteCfgModal.value = true;
}

const showEditCfgModal = ref(false);
const toEditCfg = ref<CustomPropertyCfg>();
function clickEditCfg(cfg: CustomPropertyCfg) {
  toEditCfg.value = { ...cfg };
  showEditCfgModal.value = true;
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
