<?php

namespace GoodmotionCookieConsent\Inc;

require_once dirname(__FILE__) . '/helpers/get_manifest.php';
require_once dirname(__FILE__) . '/helpers/order_manifest.php';


/**
 * get path after wp-content
 */
function get_wp_path($path)
{
  // split path from wp-content
  $_path_ = explode('wp-content', $path);

  return count($_path_) > 0 ? $_path_[1] : '';
}

/**
 * Enqueue scripts.
 */
function add_script($slug, $path, $port, $is_admin, $is_ts = false)
{
  // for plugin
  $root_path = $is_admin ? GOODMOTION_COOKIE_CONSENT_ADMIN_PATH : GOODMOTION_COOKIE_CONSENT_PATH;
  $public_path = plugin_dir_url('') . GOODMOTION_COOKIE_CONSENT_NAME . ($is_admin ? '/' . GOODMOTION_COOKIE_CONSENT_ADMIN_DIR : '');

  if (WP_ENV !== 'development') {

    $config = Helpers\get_manifest($path . '/dist/manifest.json');
    if (!$config) {
      return;
    }
    // load others files
    $files = get_object_vars($config);
    // order files
    $ordered = Helpers\order_manifest($files);

    // loop for enqueue script
    foreach ($ordered as $key => $value) {
      if (property_exists($key, 'css') === true || strpos($value->src, '.css') !== false) continue;
      wp_enqueue_script($slug . '-' . $key, $public_path . '/dist/' . $value->file, [], $key, true);
    }
  } else {
    // development
    wp_enqueue_script($slug, 'http://localhost:' . $port . '/wp-content' . get_wp_path($path) . '/src/main' . ($is_ts ? '.ts' : '.js'), ['wp-i18n'], strtotime('now'), true);
  }
}

/**
 * Register the JavaScript for the public-facing side of the site.
 */
function enqueue_scripts($slug, $path, $port, $is_admin, $is_ts = false)
{
  // update script tag with module attribute
  add_filter('script_loader_tag', function ($tag, $handle, $src) use ($slug) {
    if (strpos($handle, $slug) === false) {
      return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" crossorigin src="' . esc_url($src) . '"></script>';

    return $tag;
  }, 10, 3);

  if ($is_admin === false && is_admin()) return;


  add_action($is_admin ? 'admin_enqueue_scripts' : 'wp_enqueue_scripts', function ($hook) use ($slug, $path, $port, $is_admin, $is_ts) {
    if ($hook !== 'settings_page_goodmotion-cookie-consent' && $is_admin) return;
    namespace\add_script($slug, $path, $port, $is_admin, $is_ts);
  });
}

/**
 * Register the CSS
 */
function enqueue_styles($slug, $path, $is_admin)
{
  if (!file_exists($path . '/dist/manifest.json')) {
    return;
  }
  add_action(
    ($is_admin ? 'admin' : 'wp') . '_enqueue_scripts',
    function () use ($slug, $is_admin) {
      // for plugin
      $root_path = $is_admin ? GOODMOTION_COOKIE_CONSENT_ADMIN_PATH : GOODMOTION_COOKIE_CONSENT_PATH;
      $public_path = plugin_dir_url('') . GOODMOTION_COOKIE_CONSENT_NAME . ($is_admin ? '/' . GOODMOTION_COOKIE_CONSENT_ADMIN_DIR : '');

      if (WP_ENV !== 'development') {
        // get file name from manifest
        $config = Helpers\get_manifest($root_path . '/dist/manifest.json');
        if (!$config) {
          return;
        }
        $files = get_object_vars($config);
        // order files
        $ordered = Helpers\order_manifest($files);
        if (!$ordered) {
          return;
        }
        // search css key
        foreach ($ordered as $key => $value) {
          // only entry and css
          // # todo add to press-wind base theme
          if (property_exists($value, 'css') === false && strpos($value->src, '.css') === false) continue;
          if (strpos($value->src, '.css') > 0) {
            $css = [$value->file];
          } else {
            $css = $value->css;
          }
          // $css is array
          foreach ($css as $file) {
            // get token file
            $token = Helpers\get_token_name($file);
            wp_enqueue_style(
              $slug . '-' . $key,
              $public_path . '/dist/' . $file,
              [],
              $key,
              'all'
            );
          }
        }
      }
    }
  );
}

/**
 * Load assets
 * @param string $slug - unique slug
 * @param string $path - path for main file ex: dirname(__FILE__) for root them from function.php
 * @param string $port - port for development
 * @param bool $is_admin - if true, load only for admin
 * @param bool $is_ts - if true, load .ts instead of .js
 */
function load_assets($slug, $path, $port = '4444', $is_admin = false, $is_ts = false)
{
  namespace\enqueue_scripts($slug, $path, $port, $is_admin, $is_ts);
  namespace\enqueue_styles($slug, $path, $is_admin);
}
