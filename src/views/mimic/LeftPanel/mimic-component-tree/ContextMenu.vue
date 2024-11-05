<template>
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :options
    :x
    :y
    :show
    size="small"
    :on-clickoutside="hideMenu"
    @select="clickContextMenuHandler"
  />
</template>

<script setup lang="ts">
import { NDropdown, type TreeOption } from 'naive-ui';
import * as _ from 'lodash-es';
import { useContextShowHide } from '@mimic/hooks';

const { x, y, show, showMenu, hideMenu } = useContextShowHide();
const targetDirDeleteDisabled = ref(false);
let targetDirPath = '';

function onContextMenuClick(event: MouseEvent, treeOption: TreeOption) {
  targetDirDeleteDisabled.value = Boolean(treeOption.children?.length);
  targetDirPath = treeOption.key as string;
  showMenu(event);
}

function newCodeComponent() {
  console.log('新建代码组件');
}

function newGraphComponent() {
  console.log('新建图形组件');
}

const actionHandlers = {
  newCodeComponent,
  newGraphComponent,
};

function clickContextMenuHandler(action: string) {
  hideMenu();
  const actionHandler = actionHandlers[action];
  if (!actionHandler) console.error(`没有 ${action} 的处理函数`);
  else actionHandler();
}

const options = computed(() => [
  {
    label: '新建',
    key: 'new',
    children: [
      {
        label: '代码组件',
        key: 'newCodeComponent',
      },
      {
        label: '图形组件',
        key: 'newGraphComponent',
      },
    ],
  },
  {
    label: () => h('div', { style: { color: 'red' } }, '删除'),
    key: 'delete',
    disabled: targetDirDeleteDisabled.value,
  },
  {
    type: 'divider',
    key: 'd1',
  },
]);

defineExpose({
  onContextMenuClick,
});
</script>

<style scoped>
.red-txt {
  color: red;
}
</style>
