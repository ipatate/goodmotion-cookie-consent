<?php

namespace GoodmotionCookieConsent\Inc;


/** save values */
function save_gcc_layout()
{
  $data = sanitize_text_field($_POST['data']);
  // update value
  if ($data) {
    update_option("gcc_layout", $data);
  }
  // return new value
  echo (get_option("gcc_layout"));

  wp_die();
}

add_action('wp_ajax_save_gcc_layout', __NAMESPACE__ . '\save_gcc_layout');

/** get values */
function get_gcc_layout()
{
  // return value
  $res = get_option("gcc_layout");
  echo ($res ? $res : "{}");
  wp_die();
}

add_action('wp_ajax_get_gcc_layout', __NAMESPACE__ . '\get_gcc_layout');
