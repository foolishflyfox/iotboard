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
    </div>
  </NModal>
</template>

<script setup lang="ts">
/** eslint-disable-next-line dot-notation */
import { NModal, NSpace, NIcon } from 'naive-ui';
import { Close, Expand, Contract } from '@vicons/ionicons5';
import { useElementSize } from '@vueuse/core';
import { useMimicDisplayStatus } from '@/views/mimic/stores';

const props = defineProps<{
  showModal?: boolean;
}>();

const emit = defineEmits<{
  'update:showModal': [v: boolean]
}>();

const { curUi } = toRefs(useMimicDisplayStatus());
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
  width: '1150px',
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
      const svg = dom.getElementsByTagName('svg')[0];
      const svgAttributes = svg.attributes as any;

      let nw = svgContainerWidth.value;
      let nh = nw * svgAttributes.height.value / svgAttributes.width.value;
      if (nh > svgContainerHeight.value) {
        nh = svgContainerHeight.value;
        nw = nh * svgAttributes.width.value / svgAttributes.height.value;
      }
      svg.style.width = `${nw}px`;
      svg.style.height = `${nh}px`;
      svgTargetRef.value.innerHTML = svg.outerHTML;
    }
  }
}

const selectedElement = ref<HTMLElement>();

function svgClickHandler(e: MouseEvent) {
  // console.log('@@@', e.target);
  console.log('@@@', e.target instanceof SVGPathElement);
  console.log('###', e.target);
  const targetAttributes: any = (e.target as any).attributes;
  console.log('!!!', targetAttributes?.fill?.value);
}

onMounted(() => {
  loadSvg();
});
</script>

<style scoped>
.chess {
  background-color: #00bfff30;
}
</style>
