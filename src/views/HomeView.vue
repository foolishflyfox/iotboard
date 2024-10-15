<script setup lang="ts">
const count = ref(0);

function increment() {
  count.value += 1;
}
</script>

<template>
  <main>
    <h1 class="text-green-600">XXXX</h1>
    <div>count = {{ count }}</div>
    <n-button @click="increment">++</n-button>
  </main>
</template>
