<template>
  <div
    class="p-6 bg-gray-100 border-t-0 border-b-0 border-r-0 border-solid border-l-3 border-primary"
    :class="{
      'border-primary': store.scripts[slug].activated,
      'border-zinc-300': !store.scripts[slug].activated,
    }"
  >
    <FormKit
      type="form"
      submit-label="settings"
      @submit="submitHandler"
      :actions="false"
      v-model="store.scripts[slug]"
    >
      <FormKit
        type="hidden"
        name="type"
        value="analytics"
        :value="store.scripts[slug].activated"
      />
      <label class="flex items-center gap-2">
        <FormKit type="checkbox" name="activated" />
        <legend class="mb-3">{{ name }}</legend>
      </label>
      <fieldset>
        <FormKit
          type="text"
          name="id"
          :label="__('script.id') + ' ' + name"
          :help="__('script.id_help')"
          :disabled="!store.scripts[slug].activated"
        />
        <FormKit
          type="textarea"
          rows="10"
          name="template"
          :label="__('script.content')"
          :help="__('script.content_help')"
          :disabled="!store.scripts[slug].activated"
        />
        <FormKit
          type="submit"
          :disabled="store.loading || !store.scripts[slug].activated"
          class="button button-primary"
          :label="__('button.save')"
        />
      </fieldset>
    </FormKit>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useMainStore } from '../stores'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
})

const store = useMainStore()

const submitHandler = (value) => {
  const scriptsMix = { ...store.scripts, [props.slug]: value }
  console.log(scriptsMix)
  store.saveValues('save_gcc_scripts', scriptsMix)
}
</script>
