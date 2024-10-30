<template>
  <div class="blog">
    <h1>Stroke - 线性渐变</h1>
    <div class="reference">
      <div>参考</div>
      <ul>
        <li>
          <a href="https://www.leaferjs.com/ui/reference/property/paint/linear.html">
            Leafer: LinearGradient
          </a>
        </li>
      </ul>
    </div>
    <hr />
    <div>线性渐变对象可用于描边。</div>
    <div id="demo1" class="mt-10px h-110px"></div>
    <div>xxx</div>
    <h2>二级标题</h2>
    <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
    <h3>三级标题</h3>
    <VCodeBlock
      :code="code"
      highlightjs
      label="Hello World"
      lang="javascript"
      theme="atom-one-dark"
    />
  </div>
</template>

<script setup lang="ts">
import VCodeBlock from '@wdns/vue-code-block';
import { Leafer, Rect } from 'leafer-ui';
const code = ref(`const foo = 'bar';`);

onMounted(() => {
  const width = 100;
  const height = 100;
  const strokeWidth = 8;
  const cornerRadius = 22;
  const demo1 = new Leafer({ view: 'demo1' });
  demo1.add(
    new Rect({
      width,
      height,
      strokeWidth,
      cornerRadius,
      stroke: {
        type: 'linear',
        from: 'top',
        to: 'bottom',
        stops: ['red', 'orange'],
      },
    }),
  );
});
</script>

<style scoped>
@import './doc.css';
</style>
