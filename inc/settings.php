<?php

/**
 * create object settings variables for js cookie consent
 * includes in page head
 */

namespace GoodmotionCookieConsent\Inc;

require dirname(__FILE__) . '/services.php';

/** scripts from DB */
function hasAnalytics()
{
  $scripts = namespace\gcc_value('scripts');
  $has = false;
  if (!$scripts) return $has;
  foreach ($scripts as $key => $value) {
    if ($value->activated === true && $value->type === 'analytics') {
      $has = true;
    }
  }
  return $has;
}

/** iframes from DB */
function hasIframe()
{
  $settings = namespace\gcc_value('settings');
  if(!$settings) return false;
  return count($settings->iframes) > 0;
}


/**
 * define cookie consent modal content
 */
function get_consent_modal()
{
  $modal = [
    'title' => __("We use cookies!", 'goodmotion-cookie-consent'),
    'description' =>
    __("Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it.", 'goodmotion-cookie-consent'),
    'primary_btn' => [
      'text' => __("Accept All", 'goodmotion-cookie-consent'),
      'role' => 'accept_all'
    ],
    'secondary_btn' => [
      'text' => __(
        "Reject All",
        'goodmotion-cookie-consent'
      ),
      'role' => 'accept_necessary'
    ],
    'revision_message' =>
    __(
      "cc_consent.revision_message",
      'goodmotion-cookie-consent'
    )
  ];

  // if settings button is activated instead of reject all
  $settings = namespace\gcc_value('settings');
  if ($settings &&
  $settings->bannerSettingsButton === true) {
    $modal['secondary_btn'] = [
      'text' => __(
        "Preferences",
        'goodmotion-cookie-consent'
      ),
      'role' => 'settings'
    ];
  }

  return $modal;
}



/**
 * define cookie settings modal content
 */
function get_settings_modal()
{
  $values = [
    'title' => __(
      "🍪 Cookies settings",
      'goodmotion-cookie-consent'
    ),
    'save_settings_btn' => __("Save settings", 'goodmotion-cookie-consent'),
    'accept_all_btn' => __("Accept all", 'goodmotion-cookie-consent'),
    'reject_all_btn' => __("Reject all", 'goodmotion-cookie-consent'),
    'close_btn_label' => __("Close", 'goodmotion-cookie-consent'),
    'cookie_table_headers' => [
      [
        'col1' => __("Name", 'goodmotion-cookie-consent')
      ],
      [
        'col2' => __(
          "Domain",
          'goodmotion-cookie-consent'
        )
      ],
      [
        'col3' => __(
          "Usage",
          'goodmotion-cookie-consent'
        )
      ],
    ],
    'blocks' => [
      [
        'description' => __("We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.", 'goodmotion-cookie-consent')
      ],
      [
        'title' => __("Strictly necessary cookies", 'goodmotion-cookie-consent'),
        'description' => __("These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly", 'goodmotion-cookie-consent'),
        'toggle' => [
          'value' => "necessary",
          'enabled' => true,
          'readonly' => true,
        ],
      ],
    ]
  ];

  $scripts = namespace\gcc_value('scripts');
  $services = namespace\get_services_settings();
  // add analytics block
  if (hasAnalytics()) {
    $analytics =
      [
        'title' => __("Performance and Analytics cookies", 'goodmotion-cookie-consent'),
        'description' => __("These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you", 'goodmotion-cookie-consent'),
        'toggle' => [
          'value' => "analytics",
          'enabled' => false,
          'readonly' => false,
        ],
        'cookie_table' => [],
      ];

    foreach ($scripts as $key => $value) {
      if ($value->activated === true && $value->type === 'analytics' && array_key_exists($key, $services)) {
        if (array_key_exists('content', $services[$key])) {
          $analytics['cookie_table'][] = $services[$key]['content'];
        }
      }
    }

    $values['blocks'][] = $analytics;
  }

  if (hasIframe()) {
    // add display block
    $display = [
      'title' => __("External Display", 'goodmotion-cookie-consent'),
      'description' => __("We use third-party services to provide functionality and display useful content on our website.", 'goodmotion-cookie-consent'),
      'toggle' => [
        'value' => "display",
        'enabled' => false,
        'readonly' => false,
      ],
      'cookie_table' => [],
    ];

    $settings = namespace\gcc_value('settings');
    $iframesActivated = $settings->iframes;
    $iframes = namespace\get_iframes_settings();
    foreach ($iframesActivated as $k => $value) {
      if ($iframes && array_key_exists($value, $iframes)) {
        if (array_key_exists('content', $iframes[$value])) {
          $display['cookie_table'][] = $iframes[$value]['content'];
        }
      }
    }

    $values['blocks'][] = $display;
  }

  return $values;
}


/**
 * define iframe modal content
 */
function get_iframe()
{
  if (hasIframe()) {
    $settings = namespace\gcc_value('settings');
    $iframesActivated = $settings->iframes;
    $iframes = namespace\get_iframes_settings();
    $iframes_configs = [];
    foreach ($iframesActivated as $k => $value) {
      if ($iframes && array_key_exists($value, $iframes)) {
        if (array_key_exists('settings', $iframes[$value])) {
          // var_dump(($iframes[$value]['settings']['thumbnailUrl']));
          $iframes_configs[$value] = $iframes[$value]['settings'];
          if (array_key_exists('thumbnailUrl', $iframes_configs[$value])) {
            // remove line breaks
            $iframes_configs[$value]['thumbnailUrl'] = preg_replace('/\n/m', '', $iframes_configs[$value]['thumbnailUrl']);
          }
        }
      }
    }
    return $iframes_configs;
  }
  return [];
}



/**
 * load cookie settings
 */
function set_var_settings_cookies()
{
  $var =
    [
      'consent_modal' => namespace\get_consent_modal(),
      'settings_modal' => namespace\get_settings_modal(),
      'iframe' => namespace\get_iframe(),
    ];
  echo '<script type="text/javascript">var goodmotionCookieConsentLocales =' . json_encode($var) . ';';
  echo '</script>';
}

add_action('wp_head', __NAMESPACE__ . '\set_var_settings_cookies');
