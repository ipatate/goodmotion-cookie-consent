<?php

/**
 * api for ajax request from app admin
 */

namespace GoodmotionCookieConsent\Inc;

/**
 * get value from db
 */
function gcc_value($key)
{
    $data = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . $key);
    if (! $data) {
        return null;
    }

    return $data->value;
}

/** save values */
function save_gcc($key): void
{
    if (! $key) {
        return;
    }
    $data = $_POST['data'];
    $data = sanitize_text_field($data);
    $decoded = json_decode(str_replace(['\\n', '\\'], '', $data));

    // update value
    if ($data) {
        update_option(GOODMOTION_COOKIE_CONSENT_PREFIX . $key, $decoded);
    }
    // return new value
    $res = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . $key);
    wp_send_json_success($res ? $res : null);
}

/** get values */
function get_gcc($key): void
{
    if (! $key) {
        return;
    }
    // return value
    $res = get_option(GOODMOTION_COOKIE_CONSENT_PREFIX . $key);
    wp_send_json_success($res ? $res : null);
}

add_action('wp_ajax_save_gcc_layout', function () {
    namespace\save_gcc('layout');
});

add_action('wp_ajax_get_gcc_layout', function () {
    namespace\get_gcc('layout');
});

add_action('wp_ajax_save_gcc_settings', function () {
    namespace\save_gcc('settings');
});

add_action('wp_ajax_get_gcc_settings', function () {
    namespace\get_gcc('settings');
});

add_action('wp_ajax_save_gcc_scripts', function () {
    namespace\save_gcc('scripts');
});

add_action('wp_ajax_get_gcc_scripts', function () {
    namespace\get_gcc('scripts');
});
