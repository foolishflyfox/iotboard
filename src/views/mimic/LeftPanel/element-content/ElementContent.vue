<template>
  <div class="h-full">
    <NInput type="text" round placeholder="搜索元素" size="small" @keydown.stop>
      <template #suffix>
        <NIcon :component="Search" />
      </template>
    </NInput>
    <NCollapse
      class="mt-10px"
      :default-expanded-names="_.keys(elementCategories)"
      display-directive="show"
    >
      <NCollapseItem v-for="nm of _.keys(elementCategories)" :name="nm" :key="nm">
        <template #header>
          <div class="font-bold">
            {{ elementCategories[nm].label }}
          </div>
        </template>
        <NSpace>
          <ElementItem v-for="e of elementCategories[nm].elements" v-bind="e" :key="e.path" />
        </NSpace>
      </NCollapseItem>
    </NCollapse>
    <div class="mt-2em">
      元素等同于内置组件，例如视频组件、echarts 组件等都归类到元素中
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem, NIcon, NInput, NSpace } from 'naive-ui';
import { Search } from '@vicons/ionicons5';
import * as _ from 'lodash-es';
import { elementCategories } from './elements';
import ElementItem from './ElementItem.vue';
</script>

<style scoped></style>
