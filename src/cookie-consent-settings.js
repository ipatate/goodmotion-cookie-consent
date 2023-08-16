import 'vanilla-cookieconsent'
import '@orestbida/iframemanager'

// # TODO
// gui option : layout, position, transition ok
// cookie expiration ok
// delay
// add category
// add service with category
// link privacy policy
// use revision id

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
  currLang: 'default',
  services: {
    youtube: {
      embedUrl: '{data-id}',
      // thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
      iframe: {
        allow:
          'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
      },
      // cookie: {
      //   name: 'cc_youtube',
      // },
      languages: {
        default: {
          notice:
            'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Terms and conditions" target="_blank">terms and conditions</a> of youtube.com.',
          loadBtn: 'Load video',
          loadAllBtn: "Don't ask again",
        },
      },
    },
  },
})

// cookieconsent
cc.run({
  current_lang: 'default',
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
    default: {
      consent_modal: window.goodmotionCookieConsentLocales.consent_modal,
      settings_modal: window.goodmotionCookieConsentLocales.settings_modal,
    },
  },

  onFirstAction: function () {
    console.log('onFirstAction fired')
  },

  onAccept: function () {
    console.log('onAccept fired!')

    // If analytics category is disabled => load all iframes automatically
    if (cc.allowedCategory('analytics')) {
      console.log('iframemanager: loading all iframes')
      manager.acceptService('all')
    }
  },

  onChange: function (cookie, changed_preferences) {
    console.log('onChange fired!')

    // If analytics category is disabled => ask for permission to load iframes
    if (!cc.allowedCategory('analytics')) {
      console.log('iframemanager: disabling all iframes')
      manager.rejectService('all')
    } else {
      console.log('iframemanager: loading all iframes')
      manager.acceptService('all')
    }
  },
})
