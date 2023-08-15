<template>
  <div class="w-full px-2 py-16 gm-admin_panel sm:px-0">
    <h1 class="pb-5 text-2xl">{{ __('main.title') }}</h1>
    <Alert />
    <div class="py-2"></div>
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
    <div
      v-show="store.loading === true"
      class="absolute inset-0 flex items-center justify-center bg-slate-600/0"
    >
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from './stores'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Alert from './components/Alert.vue'
import Layout from './components/Layout.vue'
import Loader from './components/Loader.vue'
const store = useMainStore()
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
