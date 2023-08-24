<template>
  <div class="flex flex-col gap-4">
    <Tag
      v-for="script in scripts"
      :key="script.slug"
      :name="script.name"
      :slug="script.slug"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Tag from './Tag.vue'
const props = defineProps({
  scripts: {
    type: Object,
    required: true,
  },
})

console.log(props)
</script>
