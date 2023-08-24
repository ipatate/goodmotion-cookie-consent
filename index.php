<?php

namespace GoodmotionCookieConsent;

require_once(dirname(__FILE__) . '/inc/load_assets.php');
require_once(dirname(__FILE__) . '/inc/admin.php');
require_once(dirname(__FILE__) . '/inc/api.php');
require_once(dirname(__FILE__) . '/inc/load_config.php');
require_once(dirname(__FILE__) . '/inc/i18n.php');
require_once(dirname(__FILE__) . '/inc/iframe.php');

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

if (!defined('WP_ENV')) {
  define('WP_ENV', 'development');
}


define('GOODMOTION_COOKIE_CONSENT_PATH', plugin_dir_path(__FILE__));

define('GOODMOTION_COOKIE_CONSENT_ADMIN_DIR', 'admin-app');
define('GOODMOTION_COOKIE_CONSENT_ADMIN_PATH', plugin_dir_path(__FILE__) . GOODMOTION_COOKIE_CONSENT_ADMIN_DIR);

define('GOODMOTION_COOKIE_CONSENT_NAME', 'goodmotion-cookie-consent');

define('GOODMOTION_COOKIE_CONSENT_PREFIX', 'goodmotion-cookie-consent_');

/**
 * init assets front
 */
load_assets(GOODMOTION_COOKIE_CONSENT_NAME, dirname(__FILE__) . '', '7979');

/**
 * init assets admin
 */
load_assets(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', dirname(__FILE__) . '/admin-app', '7980', true);


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

add_action('init', __NAMESPACE__ . '\load_textdomain');

/**
 * load translations
 */
function set_script_translations()
{
  // wp_set_script_translations(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', GOODMOTION_COOKIE_CONSENT_NAME,  plugin_dir_path(__FILE__) . 'languages');
  // set translation in js var
  wp_localize_script(GOODMOTION_COOKIE_CONSENT_NAME . '-admin', 'goodmotionCookieConsent', include_once(dirname(__FILE__) . '/locale.php'));
}

add_action('admin_enqueue_scripts', __NAMESPACE__ . '\set_script_translations', 100);


add_action('wp_head', function () {
  echo '<!-- Google tag (gtag.js) --><script type="text/plain" data-cookiecategory="analytics" src="https://www.googletagmanager.com/gtag/js?id=G-JWXD5NGD0J"></script>
<script type="text/plain" data-cookiecategory="analytics">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag(\'js\', new Date());
  gtag(\'config\', \'G-JWXD5NGD0J\');
</script>';
});
