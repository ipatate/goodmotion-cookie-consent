<template>
  <div class="relative w-full px-2 py-16 gm-admin_panel sm:px-0">
    <h1 class="pb-10 text-2xl">{{ __('main.title') }}</h1>
    <TabGroup>
      <TabList class="flex">
        <Tab class="tabbutton">
          {{ __('tab.layout') }}
        </Tab>
        <Tab class="tabbutton">
          {{ __('tab.settings') }}
        </Tab>
      </TabList>
      <TabPanels class="border-t border-solid border-slate-600">
        <TabPanel class="tabpanel"><Layout /></TabPanel>
        <TabPanel class="tabpanel">Content 2</TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useMainStore } from "./stores";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Layout from './components/Layout.vue'
// const store = useMainStore();
</script>

<style scoped>
.tabbutton {
  @apply p-2.5 text-sm leading-5 text-gray-600  focus:outline-none bg-slate-100 min-w-[10rem] border border-solid border-slate-500 border-r-0 border-b-0 font-light;
}

.tabbutton:last-child {
  @apply border-r;
}

.tabbutton[data-headlessui-state='selected'] {
  @apply text-slate-800 bg-slate-300 font-medium;
}

.tabpanel {
  @apply p-3 focus:outline-none py-7;
}
</style>
