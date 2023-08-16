<?php

namespace GoodmotionCookieConsent\Inc;


/** save values */
function save_gcc_layout()
{
  $data = sanitize_text_field($_POST['data']);
  $decoded = json_decode(str_replace('\\', '', $data),);
  // update value
  if ($data) {
    update_option(GOODMOTION_COOKIE_CONSENT_PREFIX . "layout", $decoded);
  }
  // return new value
  $res = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . "layout");
  wp_send_json_success($res ? $res : null);
}

add_action('wp_ajax_save_gcc_layout', __NAMESPACE__ . '\save_gcc_layout');

/** get values */
function get_gcc_layout()
{
  // return value
  $res = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . "layout");
  wp_send_json_success($res ? $res : null);
}

add_action('wp_ajax_get_gcc_layout', __NAMESPACE__ . '\get_gcc_layout');
