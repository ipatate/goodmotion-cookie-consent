<template>
  <FormKit
    type="form"
    submit-label="settings"
    @submit="submitHandler"
    :actions="false"
    #default="{ value }"
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
          :label="__('label.consent.position1')"
          name="consentPosition1"
          :options="['bottom', 'middle', 'top']"
        />
        <FormKit
          type="select"
          :label="__('label.consent.position2')"
          name="consentPosition2"
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
    <hr class="my-4" />
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
          :label="__('label.settings.position1')"
          name="settingsPosition1"
          :options="['bottom', 'middle', 'top']"
        />
        <FormKit
          type="select"
          :label="__('label.settings.position2')"
          name="settingsPosition2"
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
    <pre wrap>{{ value }}</pre>
  </FormKit>
  <div v-show="store.loading === true" class="gm-admin-panel-loader">
    <Loader />
  </div>
</template>

<script setup>
import { useMainStore } from '../stores'
import Loader from './Loader.vue'
const store = useMainStore()

const submitHandler = (value) => {
  store.loading = true
  setTimeout(() => {
    store.loading = false
  }, 2000)
}
</script>
