import 'vanilla-cookieconsent'
import '@orestbida/iframemanager'

const manager = iframemanager()

const cc = initCookieConsent()

const defaultSettings = {
  layout: {
    consentLayout: 'cloud',
    consentPositionX: 'bottom',
    consentPositionY: 'left',
    consentTransition: 'slide',
    settingsLayout: 'box',
    settingsPositionX: 'bottom',
    settingsPositionY: 'left',
    settingsTransition: 'slide',
  },
  settings: {
    cookieExpiration: 183,
    cookieName: 'cc_cookie',
  },
}

const finalSettings = window.goodmotionCookieConsentSettings
  ? Object.assign(defaultSettings, window.goodmotionCookieConsentSettings)
  : defaultSettings

// iframemanager
manager.run({
  currLang: 'en',
  services: {
    video: {
      embedUrl: '{data-id}',
      // thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
      iframe: {
        allow:
          'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
        frameBorder: 0,
      },
      // cookie: {
      //   name: 'cc_youtube',
      // },
      languages: {
        en: window.goodmotionCookieConsentLocales.iframe.video,
      },
    },
  },
  onFirstAction: function () {
    console.log('first action')
  },

  onAccept: function () {
    console.log('accept')
  },

  onChange: function ({ changedServices, eventSource }) {
    const accept = eventSource.action === 'accept'
    const accepted = []
    // only 2 categories for this site
    if (cc.allowedCategory('analytics')) {
      accepted.push('analytics')
    }
    changedServices.forEach(function (service) {
      if (accept) {
        accepted.push('display')
        cc.accept(accepted)
      } else {
        cc.accept(accepted, ['display'])
      }
    })
  },
})

const manageDisplay = (_cc) => {
  if (_cc.allowedCategory('display')) {
    manager.acceptService('all')
  } else {
    manager.rejectService('all')
  }
}

// cookieconsent
cc.run({
  current_lang: 'en',
  autoclear_cookies: true, // default: false
  cookie_name: finalSettings.settings.cookieName,
  cookie_expiration: finalSettings.settings.cookieExpiration,
  page_scripts: true,
  force_consent: true, // default: false
  gui_options: {
    consent_modal: {
      layout: finalSettings.layout.consentLayout, // box,cloud
      position:
        finalSettings.layout.consentPositionX +
        ' ' +
        finalSettings.layout.consentPositionY, // right,left (available only if box layout selected)
      transition: finalSettings.layout.consentTransition, // zoom,slide
    },
    settings_modal: {
      layout: finalSettings.layout.settingsLayout, // box,cloud
      position:
        finalSettings.layout.settingsPositionX +
        ' ' +
        finalSettings.layout.settingsPositionY, // right,left (available only if box layout selected)
      transition: finalSettings.layout.settingsTransition, // zoom,slide
    },
  },
  languages: {
    en: {
      consent_modal: window.goodmotionCookieConsentLocales.consent_modal,
      settings_modal: window.goodmotionCookieConsentLocales.settings_modal,
    },
  },

  onFirstAction: function () {
    manageDisplay(cc)
  },

  onAccept: function () {
    manageDisplay(cc)
  },

  onChange: function (cookie, changed_preferences) {
    manageDisplay(cc)
  },
})
