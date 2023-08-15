<template>
  <div
    v-show="store.message.success !== ''"
    class="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
    role="alert"
  >
    {{ store.message.success }}
  </div>
  <div
    v-show="store.message.error !== ''"
    class="px-4 py-3 text-red-900 bg-red-100 border-t-4 border-red-500 rounded-b shadow-md"
    role="alert"
  >
    {{ store.message.error }}
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useMainStore } from '../stores'

const store = useMainStore()

watch(
  () => store.message.error,
  (newVal) => {
    if (newVal !== '') {
      setTimeout(() => {
        store.message.error = ''
      }, 4000)
    }
  },
)

watch(
  () => store.message.success,
  (newVal) => {
    if (newVal !== '') {
      setTimeout(() => {
        store.message.success = ''
      }, 4000)
    }
  },
)
</script>
