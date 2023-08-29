import { defineStore } from 'pinia'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { __ } from '@wordpress/i18n'
import { fetchAPI, fetchREST } from '../helpers/queries'

export const useMainStore = defineStore('main', () => {
  const loading = ref(false)

  const message = ref({
    success: '',
    error: '',
  })

  // iframes list
  const iframeOptions = ref([])
  // scripts list
  const scriptTags = ref({})
  // layout settings
  const layout = ref(null)
  // general settings
  const settings = ref(null)
  // scripts settings
  const scripts = ref({})

  /**
   * fetch data on load
   */
  onMounted(async () => {
    loading.value = true
    iframeOptions.value = await fetchREST(
      '/wp-json/goodmotion-cookie-consent/v1/iframes',
    )
    scriptTags.value = await fetchREST(
      '/wp-json/goodmotion-cookie-consent/v1/services',
    )
    const { value: layoutValue } = await fetchAPI({ action: 'get_gcc_layout' })
    const { value: settingsValue } = await fetchAPI({
      action: 'get_gcc_settings',
    })
    const { value: scriptsValue } = await fetchAPI({
      action: 'get_gcc_scripts',
    })
    layout.value = layoutValue ? layoutValue : {}
    settings.value = settingsValue ? settingsValue : {}
    scripts.value = scriptsValue ? scriptsValue : {}
    loading.value = false

    Object.keys(scriptTags.value).forEach((key) => {
      const slug = scriptTags.value[key].slug
      if (!scripts.value[slug]) {
        scripts.value[slug] = {}
        scripts.value[slug].activated = false
      }
    })
  })

  const saveValues = async (action, value) => {
    if (!action) return
    loading.value = true
    let res
    try {
      res = await fetchAPI({
        action,
        data: JSON.stringify({
          value,
        }),
      })
    } catch (error) {
      console.log(error)
      loading.value = false
      message.value.error = __('Error on save process !')
      return false
    }
    message.value.success = __('Saved with success')
    layout.value = res.value
    loading.value = false
    return true
  }

  return {
    loading,
    message,
    layout,
    settings,
    scripts,
    scriptTags,
    saveValues,
    iframeOptions,
  }
})
