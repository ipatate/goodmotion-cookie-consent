<?php

/**
 * create object settings variables for js cookie consent
 * includes in page head
 */

namespace GoodmotionCookieConsent\Inc;

require dirname(__FILE__) . '/../services.php';

function hasAnalytics()
{
  $scripts = namespace\gcc_value('scripts');
  $has = false;
  foreach ($scripts as $key => $value) {
    if ($value->activated === true && $value->type === 'analytics') {
      $has = true;
    }
  }
  return $has;
}

function hasIframe()
{
  $settings = namespace\gcc_value('settings');
  return count($settings->iframes) > 0;
}



function get_consent_modal()
{
  return [
    'title' => __("cc_consent.title", 'goodmotion-cookie-consent'),
    'description' =>
    __("cc_consent.description", 'goodmotion-cookie-consent'),
    'primary_btn' => [
      'text' => __("cc_consent.accept_btn", 'goodmotion-cookie-consent'),
      'role' => 'accept_all'
    ],
    'secondary_btn' => [
      'text' => __(
        "cc_consent.settings_btn",
        'goodmotion-cookie-consent'
      ),
      'role' => 'settings'
    ],
    'revision_message' =>
    __(
      "cc_consent.revision_message",
      'goodmotion-cookie-consent'
    )
  ];
}

function get_settings_modal()
{
  $values = [
    'title' => __(
      "cc_settings.title",
      'goodmotion-cookie-consent'
    ),
    'save_settings_btn' => __("cc_settings.save_btn", 'goodmotion-cookie-consent'),
    'accept_all_btn' => __("cc_settings.accept_all_btn", 'goodmotion-cookie-consent'),
    'reject_all_btn' => __("cc_settings.reject_all_btn", 'goodmotion-cookie-consent'),
    'close_btn_label' => __("cc_settings.close_btn", 'goodmotion-cookie-consent'),
    'cookie_table_headers' => [
      [
        'col1' => __("cc_settings.col_name", 'goodmotion-cookie-consent')
      ],
      [
        'col2' => __(
          "cc_settings.col_domain",
          'goodmotion-cookie-consent'
        )
      ],
      [
        'col3' => __(
          "cc_settings.col_usage",
          'goodmotion-cookie-consent'
        )
      ],
    ],
    'blocks' => [
      [
        'description' => __("cc_block.table_description", 'goodmotion-cookie-consent')
      ],
      [
        'title' => __("cc_block.necessary_title", 'goodmotion-cookie-consent'),
        'description' => __("cc_block.necessary_description", 'goodmotion-cookie-consent'),
        'toggle' => [
          'value' => "necessary",
          'enabled' => true,
          'readonly' => true,
        ],
      ],
    ]
  ];

  // add analytics block
  if (hasAnalytics()) {
    $analytics =
      [
        'title' => __("cc_block.analytics_title", 'goodmotion-cookie-consent'),
        'description' => __("cc_block.analytics_description", 'goodmotion-cookie-consent'),
        'toggle' => [
          'value' => "analytics",
          'enabled' => false,
          'readonly' => false,
        ],
        'cookie_table' => [],
      ];

    $scripts = namespace\gcc_value('scripts');
    $services = namespace\get_services();

    foreach ($scripts as $key => $value) {
      if ($value->activated === true && $value->type === 'analytics' && array_key_exists($key, $services)) {
        foreach ($services[$key] as $key => $value) {
          $analytics['cookie_table'][] = $value;
        }
      }
    }

    $values['blocks'][] = $analytics;
  }

  if (hasIframe()) {
    // add display block
    $display = [
      'title' => __("cc_block.display_title", 'goodmotion-cookie-consent'),
      'description' => __("cc_block.display_description", 'goodmotion-cookie-consent'),
      'toggle' => [
        'value' => "display",
        'enabled' => false,
        'readonly' => false,
      ],
      'cookie_table' => [],
    ];

    $settings = namespace\gcc_value('settings');
    $iframes = $settings->iframes;
    foreach ($iframes as $k => $value) {
      if ($services && array_key_exists($value, $services)) {
        foreach ($services[$value] as $key => $value) {
          $display['cookie_table'][] = $value;
        }
      }
    }

    $values['blocks'][] = $display;
  }

  return $values;
}

function get_iframe()
{
  return [
    "video" => [
      "notice" =>
      __("cc_iframe.video_notice", 'goodmotion-cookie-consent'),
      "loadBtn " => __("cc_iframe.load_btn", 'goodmotion-cookie-consent'),
      "loadAllBtn" => __("cc_iframe.ask_btn", 'goodmotion-cookie-consent'),
    ],
  ];
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
