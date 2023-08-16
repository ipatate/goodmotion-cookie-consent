<?php

namespace GoodmotionCookieConsent\Inc;


function get_consent_modal()
{
  return [
    'title' => "Hello traveller, it's cookie time!",
    'description' =>
    'Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <a href="#privacy-policy" class="cc-link">Privacy policy</a>',
    'primary_btn' => [
      'text' => 'Accept all',
      'role' => 'accept_all', //'accept_selected' or 'accept_all'
    ],
    'secondary_btn' => [
      'text' => 'Preferences',
      'role' => 'settings', //'settings' or 'accept_necessary'
    ],
    'revision_message' =>
    '<br><br> Dear user, terms and conditions have changed since the last time you visisted!'
  ];
}

function get_settings_modal()
{
  return [
    'title' => 'Cookie settings',
    'save_settings_btn' => 'Save current selection',
    'accept_all_btn' => 'Accept all',
    'reject_all_btn' => 'Reject all',
    'close_btn_label' => 'Close',
    'cookie_table_headers' => [
      [
        'col1' => 'Name',
      ],
      [
        'col2' => 'Domain',
      ],
      [
        'col3' => 'Expiration',
      ],
    ],
    'blocks' => [
      [
        'title' => 'Cookie usage',
        'description' => 'description ...' . ' <a href="#" class="cc-link">Privacy Policy</a>.',
      ],
      [
        'title' => 'Strictly necessary cookies',
        'description' => 'description ...',
        'toggle' => [
          'value' => 'necessary',
          'enabled' => true,
          'readonly' => true,
        ],
      ],
      [
        'title' => 'Analytics & Performance cookies',
        'description' => 'description ...',
        'toggle' => [
          'value' => 'analytics',
          'enabled' => false,
          'readonly' => false,
        ],
        'cookie_table' => [
          [
            'col1' => '^_ga',
            'col2' => 'yourdomain.com',
            'col3' => 'description ...',
            'is_regex' => true,
          ],
          [
            'col1' => '_gid',
            'col2' => 'yourdomain.com',
            'col3' => 'description ...',
          ],
          [
            'col1' => 'cc_youtube',
            'col2' => 'yourdomain.com',
            'col3' => 'Cookie set by iframemanager',
          ],
        ],
      ],
    ],
  ];
}



/**
 * load cookie settings
 */
function set_script_locales_cookies()
{
  $var =
    [
      'consent_modal' => namespace\get_consent_modal(),
      'settings_modal' => namespace\get_settings_modal(),
    ];
  echo '<script type="text/javascript">var goodmotionCookieConsentLocales =' . json_encode($var) . ';';
  echo '</script>';
}

add_action('wp_head', __NAMESPACE__ . '\set_script_locales_cookies');
