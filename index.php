<?php

namespace GoodmotionCookieConsent;

require_once(dirname(__FILE__) . '/inc/load_assets.php');

use function GoodmotionCookieConsent\Inc\load_assets;

/**
 * Plugin Name: Goodmotion Cookie Consent
 *
 * @package           GoodmotionCookieConsent
 * @author            infos@goodmotion.fr
 * @copyright         2023 Goodmotion
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Goodmotion Cookie Consent
 * Plugin URI:        false
 * Description:       false
 * Version:           0.0.1
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Faramaz patrick
 * Author URI:        https://goodmotion.fr
 * Text Domain:       goodmotion-cookie-consent
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Update URI:        false
 */


define('GOODMOTION_COOKIE_CONSENT_PATH', plugin_dir_path(__FILE__));
define('GOODMOTION_COOKIE_CONSENT_NAME', 'goodmotion-cookie-consent');

/**
 * Load the plugin text domain for translation.
 *
 */ function load_textdomain()
{
    load_plugin_textdomain(
        GOODMOTION_COOKIE_CONSENT_NAME,
        false,
        basename(dirname(__FILE__)) . '/languages'
    );
}

/**
 * load translations
 */
function set_script_translations()
{
    wp_set_script_translations(GOODMOTION_COOKIE_CONSENT_NAME, GOODMOTION_COOKIE_CONSENT_NAME, plugin_dir_path(__FILE__) . 'languages');
}

add_action('init', __NAMESPACE__ . '\load_textdomain');
add_action('init', __NAMESPACE__ . '\set_script_translations');


/**
 * init assets front
 */
load_assets(GOODMOTION_COOKIE_CONSENT_NAME, dirname(__FILE__) . '', '7979');
