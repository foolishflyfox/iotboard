<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <slot />
          <NaiveProviderContent />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup lang="ts">
import {
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification
} from 'naive-ui';
import { defineComponent, h } from 'vue';

defineOptions({ name: 'NaiveProvider' });

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  },
});
</script>

<style scoped></style>
