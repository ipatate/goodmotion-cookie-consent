import './global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { __, _n, getLocaleData, defaultI18n } from '@wordpress/i18n'
import '@formkit/themes/genesis'
import panel from './main.vue'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gm-admin-app')
  if (container) {
    const pinia = createPinia()
    const app = createApp(panel, {})
    app.use(plugin, defaultConfig)
    app.use(pinia)

    // init i18n
    if (window.goodmotionCookieConsent) {
      defaultI18n.setLocaleData(
        {
          ...window.goodmotionCookieConsent,
        },
        'default',
      )
    }

    // language functions
    app.config.globalProperties.__ = __
    app.config.globalProperties._n = _n
    app.config.globalProperties.getLocaleData = getLocaleData
    app.config.globalProperties.defaultI18n = defaultI18n

    app.mount('#gm-admin-app')
  }
})
