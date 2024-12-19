<template>
  <div class="h-full">
    <NSplit
      direction="vertical"
      :resize-trigger-size="2"
      :default-size="0.65"
      :min="0.4"
      :max="0.9"
    >
      <template #1>
        <NScrollbar style="height: 100%">
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
        </NScrollbar>
      </template>
      <template #2>
        <div class="flex flex-col h-full">
          <div class="flex-1 ">
            图层
          </div>
          <div class="bg-#ddd mb-3px">
            坐标: {{ cursorPos ? `${cursorPos.x.toFixed(3)}, ${cursorPos.y.toFixed(3)}` : '' }}
          </div>
        </div>
      </template>
    </NSplit>
  </div>
</template>

<script setup lang="ts">
import { NSplit, NScrollbar } from 'naive-ui';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import DisplayProperty from './DisplayProperty.vue';
import SingleComponentProperty from './SingleComponentProperty.vue';
import { displayBaseMapId } from '@mimic/constant';
import { mimicVar } from '@mimic/global';

defineOptions({
  name: 'PropertyPanel',
});

const { selectedUiId } = toRefs(useMimicDisplayStatus());
const { cursorPos } = toRefs(useMimicWorkspaceStatus());

const selectedUI = computed(() => mimicVar.displayEditor.findUiById(selectedUiId.value));
</script>

<style scoped></style>
