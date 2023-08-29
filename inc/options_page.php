<?php

/**
 * admin page options for cookie consent
 */

namespace GoodmotionCookieConsent\Inc;


function options_page()
{
  echo '<div id="gm-admin-app" style="padding-right: 20px;"></div>';
}


function register_options_page()
{
  add_options_page(__('Cookie Consent Settings'), __('Cookie Consent Settings'), 'activate_plugins', GOODMOTION_COOKIE_CONSENT_NAME, __NAMESPACE__ . '\options_page');
}

add_action('admin_menu', __NAMESPACE__ . '\register_options_page');
