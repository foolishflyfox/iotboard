<template>
  <NModal
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
      <NSpace>
        <slot name="positive-action">
          <NButton
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
          </NButton>
        </slot>
        <NButton size="small" @click="close">
          {{ negativeText }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
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
  'positiveClick': [];
  'update:showModal': [v: boolean];
}>();

function close() {
  emit('update:showModal', false);
}
</script>

<style scoped></style>
