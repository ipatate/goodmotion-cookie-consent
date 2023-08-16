<?php

namespace GoodmotionCookieConsent\Inc;

function gcc_value($key)
{
  $data = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . $key);
  if (!$data) return null;
  // $decoded = json_decode(str_replace('\\', '', $data),);
  return $data->value;
}


function options_page()
{
  echo '<div id="gm-admin-app" style="padding-right: 20px;"></div>';
}


function register_options_page()
{
  add_options_page(__('Cookie Consent Setting'), __('Cookie Consent Setting'), 'manage_options', GOODMOTION_COOKIE_CONSENT_NAME, __NAMESPACE__ . '\options_page');
}

add_action('admin_menu', __NAMESPACE__ . '\register_options_page');
