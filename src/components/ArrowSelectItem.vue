<template>
  <div class="flex">
    <svg height="20" width="40" :style="{ transform: `scaleX(${isStart ? 1 : -1})` }">
      <line v-if="type === 'none'" x1="0" y1="10" x2="20" y2="10" :stroke :stroke-width />
      <template v-else-if="type === 'angle'">
        <polyline points="20,0 0,10 20,20" :stroke :stroke-width fill="none" />
        <line x1="0" y1="10" x2="20" y2="10" :stroke :stroke-width />
      </template>
      <polyline
        v-else-if="type === 'angle-side'"
        points="20,20 0,10 20,10"
        :stroke
        :stroke-width
        fill="none"
      />
      <template v-else-if="type === 'arrow'">
        <polygon points="0,10 20,0 15,10 20,20" :fill />
        <line x1="15" y1="10" x2="20" y2="10" :stroke :stroke-width />
      </template>
      <polygon v-else-if="type === 'triangle'" points="0,10, 20,0 20,20" :fill />
      <polygon v-else-if="type === 'triangle-flip'" points="0,0, 20,9 20,11 0,20" :fill />
      <circle v-else-if="type === 'circle'" cx="10" cy="10" r="10" :fill />
      <circle
        v-else-if="type === 'circle-line'"
        cx="10"
        cy="10"
        r="9"
        fill="none"
        :stroke
        :strokeWidth
      />
      <polygon v-else-if="type === 'square'" points="0,0 20,0 20,20 0,20" :fill />
      <polygon
        v-else-if="type === 'square-line'"
        points="1,1 19,1 19,19 1,19"
        fill="none"
        :stroke
        :stroke-width
      />
      <polygon v-else-if="type === 'diamond'" points="0,10 10,0 20,10 10,20" :fill />
      <polygon
        v-else-if="type === 'diamond-line'"
        points="1,10 10,1 20,10 10,19"
        fill="none"
        :stroke
        :stroke-width
      />
      <template v-else-if="type === 'mark'">
        <line x1="1" y1="0" x2="1" y2="20" :stroke :stroke-width />
        <line x1="1" y1="10" x2="20" y2="10" :stroke :stroke-width />
      </template>
      <line x1="20" y1="10" x2="40" y2="10" :stroke :stroke-width />
    </svg>
    <span class="ml-1em text-14px">{{ arrayLabelDict[type] }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IArrowType, IPathDataArrow } from 'leafer-ui';

withDefaults(
  defineProps<{
    isStart?: boolean;
    type: Exclude<IArrowType, IPathDataArrow>;
  }>(),
  {
    isStart: true,
  },
);

const strokeWidth = 2;
const stroke = 'black';
const fill = 'black';

const arrayLabelDict: Partial<Record<Exclude<IArrowType, IPathDataArrow>, string>> = {
  none: '无',
  angle: '角度',
  'angle-side': '单边角度',
  arrow: '标准',
  triangle: '三角',
  'triangle-flip': '反三角',
  circle: '圆形',
  'circle-line': '圆形(线性)',
  square: '方形',
  'square-line': '方形(线性)',
  diamond: '菱形',
  'diamond-line': '菱形(线性)',
  mark: '标注',
};
</script>

<style scoped></style>
