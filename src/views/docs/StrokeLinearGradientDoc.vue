<template>
  <div class="doc-wrapper">
    <h1>Stroke - 线性渐变</h1>
    <div class="reference">
      <div>参考:</div>
      <ul>
        <li>
          <a
            href="https://www.leaferjs.com/ui/reference/property/paint/linear.html"
            target="_blank"
          >
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
    <h4>枚举字符串类型 <code>IAlign</code></h4>
    <p>
      from 和 to 可以为 <code>IAlign</code> 类型，可选值为
      <template v-for="v of aligns">
        <code>{{ v }}</code> <template v-if="v !== 'bottom-right'">, </template>
      </template>
      。下面的例子演示了这两个属性的使用。
    </p>
    <div class="m-0.5em p-0.5em rounded-1 border-[#aaa] border-1">
      <LeaferApp :height="120" type="block">
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
            class="w-10em ml-5px"
            size="small"
            :options="alignOptions"
            placeholder="起始点位置"
            v-model:value="demo2Cfg.from"
          />
        </div>
        <div class="flex ml-2em">
          <div class=""><span class="font-bold">to:</span></div>
          <n-select
            class="w-10em ml-5px"
            size="small"
            :options="alignOptions"
            placeholder="结束点位置"
            v-model:value="demo2Cfg.to"
          />
        </div>
      </div>
      <VCodeBlock :code="JSON.stringify(demo2Cfg)" highlightjs lang="json" theme="atom-one-dark" />
    </div>
    <h4>坐标类型 <code>IUnitPointData</code></h4>
    from 和 to 还可以是
    <a href="https://www.leaferjs.com/ui/api/interfaces/IUnitPointData.html" target="_blank">
      IUnitPointData
    </a>
    类型，该类型指定的是一个坐标点，其有三个参数：
    <ul>
      <li>
        <code>type</code>: 表示类型，可选 <code>percent</code> 或 <code>px</code>，其中
        <code>percent</code> 表示后续的 <code>x</code>/<code>y</code> 为百分比，<code>px</code>
        表示后续的 <code>x</code>/<code>y</code> 为像素值。
      </li>
      <li><code>x</code>: 横向坐标</li>
      <li><code>y</code>: 纵向坐标</li>
    </ul>

    <p>下面的例子演示了当类型为 <code>px</code> 值的效果。</p>
    <div class="m-0.5em p-0.5em rounded-1 border-[#aaa] border-1">
      <LeaferApp :height="120" type="block">
        <Leafer>
          <Rect
            :width
            :height
            :cornerRadius
            :strokeWidth
            :stroke="{ type: 'linear', ...demo3Cfg }"
          />
        </Leafer>
      </LeaferApp>
      <div class="flex mb-5px">
        <div class="flex">
          <div class=""><span class="font-bold">from:</span></div>
          <n-input-number
            :min="0"
            :max="width"
            :step="10"
            size="small"
            class="w-110px"
            :value="demo3Cfg.from.x"
            @update:value="x => (demo3Cfg.from = { ...demo3Cfg.from, x })"
          >
            <template #prefix><code>X</code></template>
          </n-input-number>
          <n-input-number
            :min="0"
            :max="height"
            :step="10"
            size="small"
            class="w-110px ml-1em"
            :value="demo3Cfg.from.y"
            @update:value="y => (demo3Cfg.from = { ...demo3Cfg.from, y })"
          >
            <template #prefix><code>y</code></template>
          </n-input-number>
        </div>
        <div class="flex ml-2em">
          <div class=""><span class="font-bold">to:</span></div>
          <n-input-number
            :min="0"
            :max="width"
            :step="10"
            size="small"
            class="w-110px"
            :value="demo3Cfg.to.x"
            @update:value="x => (demo3Cfg.to = { ...demo3Cfg.to, x })"
          >
            <template #prefix><code>X</code></template>
          </n-input-number>
          <n-input-number
            :min="0"
            :max="height"
            :step="10"
            size="small"
            class="w-110px ml-1em"
            :value="demo3Cfg.to.y"
            @update:value="y => (demo3Cfg.to = { ...demo3Cfg.to, y })"
          >
            <template #prefix><code>y</code></template>
          </n-input-number>
        </div>
      </div>
      <VCodeBlock :code="JSON.stringify(demo3Cfg)" highlightjs lang="json" theme="atom-one-dark" />
    </div>

    <p>下面的例子演示了当类型为 <code>percent</code> 值的效果。</p>
    <div class="m-0.5em p-0.5em rounded-1 border-[#aaa] border-1">
      <LeaferApp :height="120" type="block">
        <Leafer>
          <Rect
            :width
            :height
            :cornerRadius
            :strokeWidth
            :stroke="{ type: 'linear', ...demo4Cfg }"
          />
        </Leafer>
      </LeaferApp>
      <div class="flex mb-5px">
        <div class="flex">
          <div class=""><span class="font-bold">from:</span></div>
          <n-input-number
            :min="0"
            :max="1"
            :step="0.1"
            size="small"
            class="w-110px"
            :value="demo4Cfg.from.x"
            @update:value="x => (demo4Cfg.from = { ...demo4Cfg.from, x })"
          >
            <template #prefix><code>X</code></template>
          </n-input-number>
          <n-input-number
            :min="0"
            :max="1"
            :step="0.1"
            size="small"
            class="w-110px ml-1em"
            :value="demo4Cfg.from.y"
            @update:value="y => (demo4Cfg.from = { ...demo4Cfg.from, y })"
          >
            <template #prefix><code>y</code></template>
          </n-input-number>
        </div>
        <div class="flex ml-2em">
          <div class=""><span class="font-bold">to:</span></div>
          <n-input-number
            :min="0"
            :max="1"
            :step="0.1"
            size="small"
            class="w-110px"
            :value="demo4Cfg.to.x"
            @update:value="x => (demo4Cfg.to = { ...demo4Cfg.to, x })"
          >
            <template #prefix><code>X</code></template>
          </n-input-number>
          <n-input-number
            :min="0"
            :max="1"
            :step="0.1"
            size="small"
            class="w-110px ml-1em"
            :value="demo4Cfg.to.y"
            @update:value="y => (demo4Cfg.to = { ...demo4Cfg.to, y })"
          >
            <template #prefix><code>y</code></template>
          </n-input-number>
        </div>
      </div>
      <VCodeBlock :code="JSON.stringify(demo4Cfg)" highlightjs lang="json" theme="atom-one-dark" />
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
import { NSelect, NInputNumber } from 'naive-ui';

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

const demo3Cfg = reactive<any>({
  from: { type: 'px', x: 0, y: 0 },
  to: { type: 'px', x: width, y: height },
  stops: ['#ff0000', '#00ff00'],
});

const demo4Cfg = reactive<any>({
  from: { type: 'percent', x: 0, y: 0 },
  to: { type: 'percent', x: 1, y: 1 },
  stops: ['#ff0000', '#00ff00'],
});

onMounted(() => {
  const type = 'linear';
  const demo1 = new Leafer({ view: 'demo1', type: 'block' });
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
});
</script>

<style scoped>
@import './doc.css';
</style>
