import { defineStore } from 'pinia'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { __ } from '@wordpress/i18n'

/**
 *
 * @param ({data: any, action: string})
 * @returns json
 */
const fetchAPI = async ({ data, action } = { action: null }) => {
  if (!action) return

  const dataToSend = new FormData()
  dataToSend.append('action', action)
  if (data) {
    dataToSend.append('data', data)
  }
  try {
    const call = await fetch(window.ajaxurl, {
      method: 'POST',
      credentials: 'same-origin',
      body: dataToSend,
    })
    const { data } = await call.json()
    return data ? data : {}
  } catch (error) {
    console.log(error)
  }
}

export const useMainStore = defineStore('main', () => {
  const iframeOptions = ['youtube', 'vimeo']
  const scriptTags = {
    GA: {
      name: 'Google Analytics',
      slug: 'google_analytics',
    },
    FB: {
      name: 'Facebook Pixel',
      slug: 'facebook_pixel',
    },
    Linkedin: {
      name: 'Linkedin',
      slug: 'linkedin_insight',
    },
    // GTM: {
    //   name: 'Google Tag Manager',
    //   slug: 'google_tag_manager',
    // },
  }

  const loading = ref(false)

  const message = ref({
    success: '',
    error: '',
  })

  const layout = ref(null)
  const settings = ref(null)
  const scripts = ref({})

  /**
   * fetch data on load
   */
  onMounted(async () => {
    loading.value = true
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

    Object.keys(scriptTags).forEach((key) => {
      const slug = scriptTags[key].slug
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
