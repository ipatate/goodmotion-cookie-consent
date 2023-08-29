<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    :actions="false"
    v-model="store.settings"
  >
    <fieldset>
      <legend>{{ __('label.globalSettings') }}</legend>
      <FormKit
        value="182"
        type="number"
        :label="__('label.cookieExpiration')"
        :help="
          __('Number of days before the cookie expires (182 days = 6 months)')
        "
        name="cookieExpiration"
      />
      <FormKit
        value="gcc_cookie_consent"
        type="text"
        :label="__('label.cookieName')"
        :help="__('Name of the cookie set by the plugin')"
        name="cookieName"
      />
    </fieldset>
    <fieldset>
      <legend>{{ __('label.bannerSettings') }}</legend>
      <FormKit
        type="checkbox"
        name="bannerSettingsButton"
        :value="true"
        :help="__('label.bannerSettingsHelp')"
      />
    </fieldset>
    <fieldset>
      <legend>{{ __('label.iframeSettings') }}</legend>
      <FormKit
        type="checkbox"
        name="iframes"
        :options="store.iframeOptions"
        :help="__('label.iframeSettingsHelp')"
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
  store.saveValues('save_gcc_settings', value)
}
</script>
