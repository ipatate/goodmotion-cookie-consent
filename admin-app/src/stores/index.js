import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

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
    const response = await call.text()
    return JSON.parse(response.replace(/\\"/g, '"'))
  } catch (error) {
    console.log(error)
  }
}

export const useMainStore = defineStore('main', () => {
  const loading = ref(false)

  const message = ref({
    success: '',
    error: '',
  })

  const layout = ref(null)

  /**
   * fetch data on load
   */
  onMounted(async () => {
    loading.value = true
    const layout = await fetchAPI({ action: 'get_gcc_layout' })
    layout.value = layout
    loading.value = false
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
      message.value.error = 'Error'
      return false
    }
    message.value.success = 'Saved'
    layout.value = res
    loading.value = false
    return true
  }

  return {
    loading,
    message,
    layout,
    saveValues,
  }
})
