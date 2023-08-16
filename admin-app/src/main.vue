<template>
  <div class="w-full py-10 pr-10 gm-admin_panel sm:px-0">
    <h1 class="flex flex-wrap items-center pb-5 text-2xl gap-x-2">
      <Cookie />
      {{ __('main.title') }}
    </h1>
    <Alert />
    <div class="py-2"></div>
    <TabGroup>
      <TabList class="flex gap-x-1">
        <Tab class="tabbutton">
          {{ __('tab.layout') }}
        </Tab>
        <Tab class="tabbutton">
          {{ __('tab.settings') }}
        </Tab>
        <Tab class="tabbutton">
          {{ __('tab.scripts') }}
        </Tab>
      </TabList>
      <TabPanels class="px-5 bg-white shadow">
        <TabPanel class="tabpanel"><Layout /></TabPanel>
        <TabPanel class="tabpanel"><Settings /></TabPanel>
        <TabPanel class="tabpanel">Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
    <div class="py-2"></div>
    <Alert />
    <div
      v-show="store.loading === true"
      class="absolute inset-0 flex items-center justify-center bg-white/5"
    >
      <Loader class="text-primary" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from './stores'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Loader from './components/Loader.vue'
import Alert from './components/Alert.vue'
import Cookie from './components/icons/Cookie.vue'
import Layout from './components/Layout.vue'
import Settings from './components/Settings.vue'
const store = useMainStore()
</script>

<style scoped>
.tabbutton {
  @apply p-2.5 text-sm leading-5 text-gray-700  focus:outline-none min-w-[5rem]  md:min-w-[10rem] border-0 font-normal bg-transparent;
}

.tabbutton[data-headlessui-state='selected'] {
  @apply text-gray-900 bg-white font-semibold border-t-4 border-solid border-primary;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.04);
}

.tabpanel {
  @apply p-3 focus:outline-none py-7;
}
</style>
