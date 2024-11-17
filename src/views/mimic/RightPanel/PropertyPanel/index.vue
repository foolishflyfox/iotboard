<template>
  <div class="h-full">
    <n-split
      direction="vertical"
      :resize-trigger-size="2"
      :default-size="0.65"
      :min="0.4"
      :max="0.9"
    >
      <template #1>
        <n-scrollbar style="height: 100%">
          <template v-if="selectedUI === null">
            <!-- <DisplayProperty /> -->
            <div>空</div>
          </template>
          <template v-else-if="_.isArray(selectedUI)">
            多元素配置:
            <div>均匀分布</div>
            <div>左/中/右对齐</div>
            <div>{{ selectedUI }}</div>
          </template>
          <template v-else-if="selectedUI?.id === displayBaseMapId">
            <DisplayProperty />
          </template>
          <template v-else>
            <SingleComponentProperty />
          </template>
        </n-scrollbar>
      </template>
      <template #2> 图层区域 </template>
    </n-split>
  </div>
</template>

<script setup lang="ts">
import { NSplit, NScrollbar } from 'naive-ui';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus } from '@mimic/stores';
import DisplayProperty from './DisplayProperty.vue';
import SingleComponentProperty from './SingleComponentProperty.vue';
import { displayBaseMapId } from '@mimic/constant';
import { mimicVar } from '@mimic/global';

defineOptions({
  name: 'PropertyPanel',
});

const { selectedUiId } = toRefs(useMimicDisplayStatus());

const selectedUI = computed(() => mimicVar.displayEditor.findUiById(selectedUiId.value));
</script>

<style scoped></style>
