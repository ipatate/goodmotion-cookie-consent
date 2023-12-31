<?php

namespace GoodmotionCookieConsent\Inc\Helpers;

/**
 * get manifest file generated by vite
 */
function get_manifest($rootPath = 'dist/manifest.json')
{
    $strJsonFileContents = file_get_contents($rootPath);

    return json_decode(str_replace(
        '\u0000',
        '',
        $strJsonFileContents
    ));
}
