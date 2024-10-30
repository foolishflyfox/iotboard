<template>
  <div class="kv-property">
    <div v-if="!isEmpty(label)" class="property-label w-6em flex-y-center">
      <span class="cursor-default">{{ label }}</span>
      <n-icon v-if="!_.isEmpty(routeName)" class="cursor-pointer" size="16" color="#1785ff">
        <QuestionCircle16Filled @click="jumpTo" />
      </n-icon>
    </div>
    <div class="flex-1 flex">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';
import { NIcon } from 'naive-ui';
import { QuestionCircle16Filled } from '@vicons/fluent';
import { useRouter } from 'vue-router';
import * as _ from 'lodash-es';

const props = defineProps<{
  label?: string;
  routeName?: string;
}>();

const router = useRouter();

function jumpTo() {
  const { href } = router.resolve({ name: props.routeName });
  // console.log('跳到帮助页面', href);
  window.open(href, '_blank');
}
</script>

<style scoped>
@import '../property-item.css';

.kv-property {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 10px;
  /* background-color: orange; */
}
.single-v-property {
}
</style>
