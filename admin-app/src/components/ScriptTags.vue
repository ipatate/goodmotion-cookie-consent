<template>
  <div class="grid gap-4 md:grid-cols-2">
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
</script>
