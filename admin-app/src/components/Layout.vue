<template>
  <FormKit
    type="form"
    submit-label="settings"
    @submit="submitHandler"
    :actions="false"
    v-model="store.layout"
  >
    <fieldset>
      <legend>{{ __('label.consent') }}</legend>
      <FormKit
        type="select"
        :label="__('label.consent.layout')"
        name="consentLayout"
        :options="['box', 'cloud', 'bar']"
      />
      <div class="flex flex-wrap gap-3">
        <FormKit
          type="select"
          :label="__('label.consent.positionX')"
          name="consentPositionX"
          :options="['bottom', 'middle', 'top']"
        />
        <FormKit
          type="select"
          :label="__('label.consent.positionY')"
          name="consentPositionY"
          :options="['left', 'right', 'center']"
        />
      </div>
      <FormKit
        type="select"
        :label="__('label.consent.transition')"
        name="consentTransition"
        :options="['slide', 'zoom']"
      />
    </fieldset>
    <span class="block mt-4 mb-6 border border-solid border-primary" />
    <fieldset>
      <legend>{{ __('label.settings') }}</legend>
      <FormKit
        type="select"
        :label="__('label.settings.layout')"
        name="settingsLayout"
        :options="['box', 'cloud', 'bar']"
      />
      <div class="flex flex-wrap gap-3">
        <FormKit
          type="select"
          :label="__('label.settings.positionX')"
          name="settingsPositionX"
          :options="['bottom', 'middle', 'top']"
        />
        <FormKit
          type="select"
          :label="__('label.settings.positionY')"
          name="settingsPositionY"
          :options="['left', 'right', 'center']"
        />
      </div>
      <FormKit
        type="select"
        :label="__('label.settings.transition')"
        name="settingsTransition"
        :options="['slide', 'zoom']"
      />
    </fieldset>
    <FormKit
      type="submit"
      :disabled="store.loading"
      class="button button-primary"
      :label="__('button.save')"
    />
  </FormKit>
</template>

<script setup>
import { useMainStore } from '../stores'
const store = useMainStore()

const submitHandler = (value) => {
  store.saveValues('save_gcc_layout', value)
}
</script>
