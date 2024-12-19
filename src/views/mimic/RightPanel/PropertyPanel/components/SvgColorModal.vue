<template>
  <NModal
    display-directive="if"
    :show="showModal"
    preset="dialog"
    :close="close"
    :show-icon="false"
    class="flex flex-col px-8px py-10px bg-#fff"
    :style="modalStyle"
    content-class="flex-1"
  >
    <template #header>
      <div>修改 svg 颜色</div>
    </template>
    <template #close>
      <NSpace size="small">
        <NIcon
          size="20"
          class="cursor-pointer"
          :component="isFullView ? Contract : Expand"
          @click="isFullView = !isFullView"
        />
        <NIcon size="20" class="cursor-pointer" @click="close">
          <Close />
        </NIcon>
      </NSpace>
    </template>
    <div class="h-full bg-#ccc flex">
      <div ref="svgContainerRef" class="bg-#eee w-60% flex-col justify-center">
        <div ref="svgTargetRef" class="chess" @click="svgClickHandler" />
      </div>
      <div v-if="selectedElement" class="px-0.5em py-1em">
        <NSpace :vertical="true">
          <div class="svg-element-attr">
            <div>元素类型:</div>
            <div>{{ selectedElement.tagName }}</div>
          </div>
          <div class="svg-element-attr">
            <div>原始颜色:</div>
            <ColorProperty
              style="margin: 0;"
              class="w-10em cursor-not-allowed"
              disabled
              :value="originColor"
            />
            <NTooltip trigger="hover">
              <template #trigger>
                <NButton
                  class="ml-0.5em"
                  type="primary"
                  size="tiny"
                  :disabled="originColor === currentColor"
                  @click="resetElementColor"
                >
                  <template #icon>
                    <ArrowReset20Filled />
                  </template>
                </NButton>
              </template>
              恢复初始值
            </NTooltip>
          </div>
          <div class="svg-element-attr">
            <div>当前颜色:</div>
            <ColorProperty
              style="margin: 0;"
              class="w-10em"
              :value="currentColor!"
              @update:value="changeElementColor"
            />
          </div>
        </NSpace>
      </div>
    </div>
    <template #action>
      <NSpace>
        <NButton size="small" @click="close">
          取消
        </NButton>
        <NButton
          type="primary"
          size="small"
          :disabled="confirmBtnDisabled"
          @click="updateSvgData"
        >
          确定
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<script setup lang="ts">
/** eslint-disable-next-line dot-notation */
import * as path from 'pathe';
import { NModal, NSpace, NIcon, NButton, NTooltip } from 'naive-ui';
import { Close, Expand, Contract } from '@vicons/ionicons5';
import { ArrowReset20Filled } from '@vicons/fluent';
import { useElementSize } from '@vueuse/core';
import { useMimicDisplayStatus } from '@/views/mimic/stores';
import { colord } from 'colord';
import ColorProperty from './ColorProperty.vue';
import { mimicFileApi } from '@/service/api';
import { getDataUrl } from '@/utils';
import { useCurElementProxyData } from '@mimic/hooks';

const props = defineProps<{
  showModal?: boolean;
}>();

const emit = defineEmits<{
  'update:showModal': [v: boolean];
}>();

const { curUi } = toRefs(useMimicDisplayStatus());
const curElementProxyData = useCurElementProxyData();
const svgUrl = computed(() => (curUi.value as any).url);

const svgTargetRef = ref<HTMLDivElement>();
const svgContainerRef = ref<HTMLDivElement>();

const { width: svgContainerWidth, height: svgContainerHeight } = useElementSize(svgContainerRef);

function close() {
  emit('update:showModal', false);
}

const isFullView = ref(false);
const fullViewStyle = {
  width: '100vw',
  height: '100vh',
};
const normalViewStyle = {
  width: '1000px',
  height: '750px',
};
const modalStyle = computed(() => (isFullView.value ? fullViewStyle : normalViewStyle));

async function loadSvg() {
  if (svgUrl.value) {
    const response = await fetch(svgUrl.value);
    const svgString = await response.text();
    if (!svgString) return;
    const parser = new DOMParser();
    const dom = parser.parseFromString(svgString, 'application/xml');
    if (svgTargetRef.value) {
      const svg = dom.getElementsByTagName('svg');
      const svgItem0 = svg[0];
      const svgAttributes = svgItem0.attributes as any;

      let nw = svgContainerWidth.value;
      let nh = nw * svgAttributes.height.value / svgAttributes.width.value;
      if (nh > svgContainerHeight.value) {
        nh = svgContainerHeight.value;
        nw = nh * svgAttributes.width.value / svgAttributes.height.value;
      }
      svgItem0.style.width = `${nw}px`;
      svgItem0.style.height = `${nh}px`;
      svgTargetRef.value.innerHTML = svgItem0.outerHTML;
    }
  }
}

const selectedElement = ref<HTMLElement>();
const changeColorData = ref<Map<HTMLElement, { old: string; new: string; }>>(new Map());
const currentColor = ref<string>();
const confirmBtnDisabled = computed(() => changeColorData.value.size === 0);
watchEffect(() => {
  if (selectedElement.value) {
    currentColor.value = selectedElement.value.getAttribute('fill')!;
  } else {
    currentColor.value = undefined;
  }
});
const originColor = computed(() => {
  if (selectedElement.value) {
    if (changeColorData.value.get(selectedElement.value)) {
      return changeColorData.value.get(selectedElement.value)!.old;
    } else {
      return currentColor.value;
    }
  }
  return undefined;
});

function svgClickHandler(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.getAttribute?.('fill')) {
    if (colord(target.getAttribute('fill')!).isValid()) {
      selectedElement.value = target;
      console.log('有效的颜色:', target.getAttribute('fill'));
    } else {
      // todo: 未支持 fill 为 url(xxx) 时引用其他元素，如 linearGradient 的处理
      selectedElement.value = undefined;
      console.log('无效的颜色:', target.getAttribute('fill'));
    }
  } else {
    selectedElement.value = undefined;
    console.log('没有 fill 属性');
  }
}

function changeElementColor(v: string) {
  if (selectedElement.value) {
    if (changeColorData.value.get(selectedElement.value)) {
      changeColorData.value.get(selectedElement.value)!.new = v;
    } else {
      changeColorData.value.set(selectedElement.value, {
        old: currentColor.value!,
        new: v
      });
    }
    currentColor.value = v;
    selectedElement.value.setAttribute('fill', v);
  }
}

function resetElementColor() {
  if (selectedElement.value && changeColorData.value.get(selectedElement.value)) {
    const colorChange = changeColorData.value.get(selectedElement.value)!;
    selectedElement.value.setAttribute('fill', colorChange.old);
    currentColor.value = colorChange.old;
    changeColorData.value.delete(selectedElement.value);
  }
}

async function updateSvgData() {
  const svg = svgTargetRef.value?.getElementsByTagName('svg')[0];
  if (svg) {
    const prefixPath = `${getDataUrl()}/asset/`;
    let targetPath = svgUrl.value as string;
    if (targetPath.startsWith(prefixPath)) {
      targetPath = targetPath.slice(prefixPath.length);
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrlPath = await mimicFileApi.updateDisplaySvgData(targetPath, blob);
    if (curElementProxyData.value) {
      console.log('@@@', path.join(getDataUrl(), svgUrlPath));
      curElementProxyData.value.url = path.join(getDataUrl(), svgUrlPath);
    }
  }
  close();
}

onMounted(() => {
  loadSvg();
});
</script>

<style scoped>
.chess {
  background-color: #00bfff30;
}
.svg-element-attr {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.svg-element-attr > :first-child {
  width: 6em;
  font-weight: bold;
}
</style>
