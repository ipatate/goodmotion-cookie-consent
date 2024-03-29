<?php

/**
 * Plugin Name: Goodmotion Cookie Consent
 *
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

namespace GoodmotionCookieConsent;

use GoodmotionCookieConsent\Dependencies\PressWind\PWVite;

require_once __DIR__ . '/vendor/autoload.php';

if (! defined('WP_ENV')) {
    define('WP_ENV', 'development');
}

define('GOODMOTION_COOKIE_CONSENT_PATH', plugin_dir_path(__FILE__));

define('GOODMOTION_COOKIE_CONSENT_ADMIN_DIR', 'admin-app');
define('GOODMOTION_COOKIE_CONSENT_ADMIN_PATH', plugin_dir_path(__FILE__) . GOODMOTION_COOKIE_CONSENT_ADMIN_DIR);

define('GOODMOTION_COOKIE_CONSENT_NAME', 'goodmotion-cookie-consent');

define('GOODMOTION_COOKIE_CONSENT_PREFIX', 'goodmotion-cookie-consent_');

//
require_once dirname(__FILE__) . '/inc/options_page.php';
require_once dirname(__FILE__) . '/inc/api.php';
require_once dirname(__FILE__) . '/inc/load_config.php';
require_once dirname(__FILE__) . '/inc/settings.php';
require_once dirname(__FILE__) . '/inc/iframe.php';
require_once dirname(__FILE__) . '/inc/set_scripts.php';
require_once dirname(__FILE__) . '/inc/rest.php';
require_once dirname(__FILE__) . '/default.php';

// if page is cookie consent load assets
if (isset($_GET['page']) && $_GET['page'] === GOODMOTION_COOKIE_CONSENT_NAME) {
    /**
     * init assets admin
     */
    PWVite::init(port: 7980, path: '/admin-app', position: 'admin',
        plugin_path: __FILE__, slug: GOODMOTION_COOKIE_CONSENT_NAME . '-admin', is_https: false, main_file: 'script');
}

/**
 * init assets front
 */
PWVite::init(port: 7979, path: '', position: 'front', plugin_path: __FILE__,
    slug: GOODMOTION_COOKIE_CONSENT_NAME, is_https: false);

/**
 * Load the plugin text domain for translation.
 */ function load_textdomain(): void
{
    load_plugin_textdomain(
        GOODMOTION_COOKIE_CONSENT_NAME,
        false,
        basename(dirname(__FILE__)) . '/languages'
    );
}

add_action('init', __NAMESPACE__ . '\load_textdomain');

/**
 * load translations
 */
function set_script_translations(): void
{
    wp_register_script(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', '');
    // wp_set_script_translations(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', GOODMOTION_COOKIE_CONSENT_NAME,  plugin_dir_path(__FILE__) . 'languages');
    // set translation in js var
    wp_localize_script(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', 'goodmotionCookieConsent', include_once (dirname(__FILE__) . '/locale.php'));
    wp_enqueue_script(GOODMOTION_COOKIE_CONSENT_NAME . '-admin');
}

add_action('admin_enqueue_scripts', __NAMESPACE__ . '\set_script_translations', 100);

// set scripts tags
Inc\set_scripts();

if (WP_ENV === 'development') {
    add_action('wp_footer', function () {
        echo '<a class="cc_settings">Cookies settings</a>';
    }, 100);
}
