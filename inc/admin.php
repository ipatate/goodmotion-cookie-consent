<?php

namespace GoodmotionCookieConsent\Inc;

function gcc_value($key)
{
  $data = get_option($key);
  if (!$data) return null;
  $decoded = json_decode(str_replace('\\', '', $data),);
  return $decoded->value;
}


function options_page()
{
  echo '<div id="gm-admin-app"></div>';
}


function register_options_page()
{
  add_options_page(__('Cookie Consent Setting'), __('Cookie Consent Setting'), 'manage_options', GOODMOTION_COOKIE_CONSENT_NAME, __NAMESPACE__ . '\options_page');
}

add_action('admin_menu', __NAMESPACE__ . '\register_options_page');
