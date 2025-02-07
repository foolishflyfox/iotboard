<template>
  <NModal
    display-directive="if"
    :show="showModal"
    preset="dialog"
    :show-icon="false"
    :style="{ width: '1150px', height: '750px' }"
    class="flex flex-col px-8px py-10px"
    content-class="flex-1 "
  >
    <template #header>
      <div>图扑 json 转换</div>
    </template>
    <div class="flex h-full">
      <div class="w-45% flex-col">
        <div class="px-10px py-5px">
          json 代码:
        </div>
        <div class="flex-1">
          <VAceEditor
            v-model:value="jsonStrValue"
            lang="javascript"
            theme="tomorrow"
            :options="aceEditorOptions"
            class="flex-1 w-full h-full"
          />
        </div>
      </div>
      <div class="w-55% py-10px px-5px flex-col b-l b-l-#ddd ml-10px">
        <NSpace class="mb-10px">
          <NButton size="tiny" type="primary" @click="convertJson">
            转换
          </NButton>
          <NButton size="tiny" type="primary" @click="downloadSvg" :disabled="!svgStr">
            下载svg
          </NButton>
        </NSpace>
        <div
          id="svg-container bg-white"
          ref="svgContainerRef"
          class="flex-1"
        />
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NModal, NButton, NSpace } from 'naive-ui';
import '@mimic/utils/ace-config';
import { VAceEditor } from 'vue3-ace-editor';
import type { Ace } from 'ace-builds';
import dayjs from 'dayjs';
// import * as dayjs from 'dayjs';

defineProps<{
  showModal?: boolean;
}>();

const svgContainerRef = ref<HTMLDivElement>();
const jsonStrValue = ref('');
const svgStr = ref('');

const aceEditorOptions: Partial<Ace.EditorOptions> = {
  useWorker: true, // 启用语法检查,必须为true
  // enableBasicAutocompletion: true, // 自动补全
  // enableLiveAutocompletion: true, // 智能补全
  enableSnippets: true, // 启用代码段
  showPrintMargin: false, // 去掉灰色的线，printMarginColumn
  highlightActiveLine: true, // 高亮行
  highlightSelectedWord: true, // 高亮选中的字符
  tabSize: 4, // tab锁进字符
  fontSize: 14, // 设置字号
  // wrap: false, // 是否换行
  // readonly: false, // 是否可编辑
};

function convertJson() {
  // svgContainerRef.value!.innerHTML = `<svg viewBox="0 0 1500 500"  xmlns="http://www.w3.org/2000/svg" ><polygon points="1115.10374,156.40288 1398.1376,156.40288 1398.1376,215.68771 1079.28259,215.68771" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><polygon points="268.98009,385.65409 159.67176,385.65409 159.67176,321.50366 133.10898,321.50366 133.10898,297.44853 150.67719,297.44853 150.67719,255.35446 97.47031,255.35446 79.36449,243.16509 79.36449,205.02921 50.19748,205.02921 50.19748,101.72763 42.52276,79.02435 168.21172,27.75987 195.65384,60.42303 326.49088,60.42303 326.49088,66.23073 412.75707,66.23073 412.75707,60.42303 444.51278,60.42303 444.51278,66.23114 529.21642,66.23114 529.21642,60.42303 559.41093,60.42303 559.41093,66.23114 647.16279,66.23073 647.16279,60.42303 677.45022,60.42303 677.45022,66.23114 760.6974,66.23114 760.6974,60.42303 792.36424,60.42303 792.36424,66.23114 893.1364,66.23114 893.1364,385.65409" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="1087.64361" y="215.75647" width="305.6829" height="165.82337" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="1392.91842" y="285.80849" width="15.29671" height="78.74105" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="1408.21512" y="307.07807" width="49.26212" height="35.09151" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="994.13462" y="282.30538" width="93.509" height="86.58711" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="894.01946" y="164.18684" width="99.52536" height="217.31965" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="240.98262" y="381.55686" width="1165.46206" height="80.45306" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="240.98262" y="462.00992" width="1165.46206" height="10.23022" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="219.15863" y="423.15002" width="22.09378" height="49.09011" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="927.03423" y="90.53485" width="36.35402" height="3.94529" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><polygon points="937.46626,95.04375 937.46626,164.65219 964.96887,164.65219 964.96887,149.14799 960.54316,133.65121 963.76699,133.65121 963.76699,126.86882 959.54391,126.86882 958.3303,113.64296 959.27868,118.71548 958.3303,113.64296 957.38194,108.57045 953.58848,101.8071 953.27236,99.55264 952.95624,97.29819 952.95624,95.04375 952.95624,95.04375" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="936.6279" y="126.03703" width="27.38737" height="7.24803" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><polygon points="940.47924,98.57082 940.47924,122.98598 927.8481,122.98598 927.8481,122.98598 927.41289,104.66759 927.8481,102.38216 928.2833,100.09672 928.0101,101.02356 929.08755,99.72143 930.16499,98.41931 932.13466,98.57082 932.13466,98.57082" fill="#E8E8E8" stroke="#979797" stroke-width="1" /><rect x="886.87586" y="164.65218" width="20.65916" height="216.40677" fill="#E8E8E8" stroke="#979797" stroke-width="undefined" /></svg>`;
  const json = JSON.parse(jsonStrValue.value);
  const { width, height, comps } = json;

  // SVG 根元素
  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // 遍历组件
  comps.forEach((comp) => {
    const {
      type,
      background,
      borderWidth,
      borderColor,
      pixelPerfect,
      closePath,
      points,
      rect,
      segments,
    } = comp;

    if (type === 'shape') {
      // 处理多边形
      //   const pathData =
      //     points
      //       .map((point, index) => {
      //         return `${index === 0 ? "M" : "L"}${point}`;
      //       })
      //       .join(" ") + (closePath ? " Z" : "");
      const pts: string[] = [];
      for (let i = 0; i < points.length; i += 2) {
        pts.push(`${points[i]},${points[i + 1]}`);
      }
      svg += `<polygon points="${pts.join(' ')}" fill="${
        background.value
      }" stroke="${borderColor}" stroke-width="${borderWidth ?? 0}" />`;
    } else if (type === 'rect') {
      // 处理矩形
      const [x, y, width, height] = rect;
      svg += `<rect x="${x}" y="${y}" width="${width}" height="${height}"
        fill="${background.value}" stroke="${borderColor}" stroke-width="${borderWidth ?? 0}" />`;
    }
  });

  svg += '</svg>';
  svgStr.value = svg;
  svgContainerRef.value!.innerHTML = svg;
}

function downloadSvg() {
  // 创建一个 Blob 对象
  const blob = new Blob([svgStr.value], { type: 'image/svg+xml' });

  // 创建一个下载链接
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  // dayjs();
  link.download = `${dayjs().format('YYYYMMDDHHmmss')}.svg`;

  // 触发下载
  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
</script>

<style scoped>
/* #svg-container svg {
  max-width: 100% !important;
  max-height: 100% !important;
  height: auto !important;
  width: auto !important;
} */
</style>
