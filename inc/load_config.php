<?php

/**
 * create object settings variables for js cookie consent settings
 * includes in page head
 */

namespace GoodmotionCookieConsent\Inc;

/**
 * load cookie settings
 */
function set_script_settings_cookies()
{

  $layout = gcc_value('layout');
  $settings = gcc_value('settings');
  $var =
    [
      'layout' => $layout,
      'settings' => $settings,
    ];
  echo '<script type="text/javascript">var goodmotionCookieConsentSettings =' . json_encode($var) . ';';
  echo '</script>';
}

add_action('wp_head', __NAMESPACE__ . '\set_script_settings_cookies');
