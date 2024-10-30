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
const code = ref(`const foo = 'bar';`);
</script>

<style scoped>
@import './doc.css';
</style>
