<template>
  <div class="blog">
    <h1>Stroke - 线性渐变</h1>
    <div class="reference">
      <div>参考</div>
      <ul>
        <li>
          <a href="https://www.leaferjs.com/ui/reference/property/paint/linear.html">
            Leafer: LinearGradient
          </a>
        </li>
      </ul>
    </div>
    <hr />
    <p>线性渐变对象可用于描边，如下所示:</p>
    <div id="demo1" class="mt-10px h-110px"></div>

    <h2>关键属性</h2>

    <h3>from 和 to</h3>
    <p>
      from 和 to 字段定义了渐变的起始控制点和末端控制点，相对元素的实际内容定位，起始控制点默认为
      top，末端控制点默认为 bottom。
    </p>
    <p>
      from 和 to 可以为 <code class="text-blue!">IAlign</code> 类型，可选值为
      <template v-for="v of aligns">
        <code>{{ v }}</code> <template v-if="v !== 'bottom-right'">, </template>
      </template>
      。下面的例子演示了这两个属性的使用。
    </p>
    <div class="m-0.5em p-0.5em rounded-1 border-[#aaa] border-1">
      <LeaferApp :height="120" type="draw">
        <Leafer>
          <Rect
            :width
            :height
            :cornerRadius
            :strokeWidth
            :stroke="{ type: 'linear', ...demo2Cfg }"
          />
        </Leafer>
      </LeaferApp>
      <div class="flex mb-5px">
        <div class="flex">
          <div class=""><span class="font-bold">from:</span></div>
          <n-select
            class="w-8em ml-5px"
            size="small"
            :options="alignOptions"
            placeholder="起始点位置"
            v-model:value="demo2Cfg.from"
          />
        </div>
        <div class="flex ml-2em">
          <div class=""><span class="font-bold">to:</span></div>
          <n-select
            class="w-8em ml-5px"
            size="small"
            :options="alignOptions"
            placeholder="结束点位置"
            v-model:value="demo2Cfg.to"
          />
        </div>
      </div>
      <VCodeBlock :code="JSON.stringify(demo2Cfg)" highlightjs lang="json" theme="atom-one-dark" />
    </div>

    <h3>三级标题</h3>
    <VCodeBlock
      :code="code"
      highlightjs
      label="Hello World"
      lang="javascript"
      theme="atom-one-dark"
    />
  </div>
</template>

<script setup lang="ts">
import VCodeBlock from '@wdns/vue-code-block';
import { Leafer, Rect, type IAlign } from 'leafer-ui';
import { LeaferApp } from 'leafer-vue';
import { NSelect } from 'naive-ui';

const width = 100;
const height = 100;
const strokeWidth = 8;
const cornerRadius = 22;

const defaultCfg = {
  width,
  height,
  strokeWidth,
  cornerRadius,
  stroke: 'black',
};

const code = ref(`const foo = 'bar';`);

const aligns: IAlign[] = [
  'top-left',
  'top',
  'top-right',
  'left',
  'center',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right',
];
const alignOptions = aligns.map(v => ({ label: v, value: v }));
const demo2Cfg = reactive<any>({ from: 'top', to: 'bottom', stops: ['#ff0000', '#0000ff'] });

onMounted(() => {
  const type = 'linear';
  const demo1 = new Leafer({ view: 'demo1', type: 'draw' });
  const gap = 150;
  demo1.add(
    new Rect({
      ...defaultCfg,
      stroke: {
        type,
        from: 'top',
        to: 'bottom',
        stops: ['red', 'orange'],
      },
    }),
  );
  demo1.add(
    new Rect({
      ...defaultCfg,
      x: gap,
      stroke: {
        type,
        from: 'top-left',
        to: 'bottom-right',
        stops: ['#e6b44a', '#95c65d'],
      },
    }),
  );
  demo1.add(
    new Rect({
      ...defaultCfg,
      x: gap * 2,
      stroke: {
        type,
        from: 'left',
        to: 'right',
        stops: ['#f2a849', '#ec5b52'],
      },
    }),
  );
  // const demo2Rect = new Rect({ ...defaultCfg, stroke: { type, ...demo2Cfg } });
  // demo2.add(demo2Rect);
  // const demo2RectProxy = demo2Rect.proxyData;
});
</script>

<style scoped>
@import './doc.css';
</style>
