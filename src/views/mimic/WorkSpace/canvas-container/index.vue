<template>
  <div class="bg-yellow-100" id="mimicCanvasContainer"></div>
</template>

<script setup lang="ts">
import { Leafer, Rect } from 'leafer-ui';

defineOptions({
  name: 'CanvasContainer',
});

onMounted(() => {
  const leafer = new Leafer({ view: 'mimicCanvasContainer' });

  const rect = new Rect({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
  });

  leafer.add(rect);
});
</script>

<style scoped></style>
