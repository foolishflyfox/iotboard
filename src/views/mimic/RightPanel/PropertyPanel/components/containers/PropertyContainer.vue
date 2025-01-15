<template>
  <div class="kv-property">
    <div v-if="!isEmpty(label)" class="property-label flex-y-center">
      <span class="cursor-default">{{ label }}</span>
      <NIcon v-if="!_.isEmpty(routeName)" class="cursor-pointer" size="16" color="#1785ff">
        <QuestionCircle16Filled @click="jumpTo" />
      </NIcon>
    </div>
    <div class="flex-1 flex">
      <slot />
    </div>
    <div v-if="!unbindable" class="w-20px">
      <NButton text class="pl-3px pr-3px">
        <NIcon :component="Link" :size="16" />
      </NButton>
    </div>
    <template v-else>
      <div v-if="unbindable === true || !(unbindable.hide)" class="w-20px" />
    </template>
    <!-- <div class="w-20px">
      <NButton v-if="!unbindable" text class="pl-3px pr-3px">
        <NIcon :component="Link" :size="16" />
      </NButton>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';
import { NIcon, NButton } from 'naive-ui';
import { QuestionCircle16Filled } from '@vicons/fluent';
import { useRouter } from 'vue-router';
import { Link } from '@vicons/tabler';
import * as _ from 'lodash-es';
import type { Unbindable } from '@/views/mimic/types';

const props = defineProps<{
  label?: string;
  routeName?: string;
  unbindable?: Unbindable;
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
</style>
