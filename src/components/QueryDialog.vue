<template>
  <n-modal
    :show="showModal"
    preset="dialog"
    :type="type"
    @close="emit('update:showModal', false)"
    @keydown.esc="emit('update:showModal', false)"
  >
    <template #header>
      <div>{{ title }}</div>
    </template>
    <slot />
    <template #action>
      <n-space>
        <n-button size="small" @click="close">{{ negativeText }}</n-button>
        <n-button
          type="primary"
          size="small"
          :disabled="positiveBtnDisabled"
          @click="
            () => {
              emit('positiveClick');
              close();
            }
          "
        >
          {{ positiveText }}
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton, NSpace } from 'naive-ui';

withDefaults(
  defineProps<{
    title: string;
    negativeText?: string;
    positiveText?: string;
    positiveBtnDisabled?: boolean;
    showModal?: boolean;
    type?: 'error' | 'success' | 'warning' | 'info';
  }>(),
  {
    negativeText: '取消',
    positiveText: '确定',
    positiveBtnDisabled: false,
    showModal: false,
    type: 'info',
  },
);

const emit = defineEmits<{
  positiveClick: [];
  'update:showModal': [v: boolean];
}>();

const close = () => {
  emit('update:showModal', false);
};
</script>

<style scoped></style>
