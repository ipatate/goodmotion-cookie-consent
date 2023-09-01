<?php

/**
 * parse iframe element in content for replace by cookie consent system
 */

namespace GoodmotionCookieConsent\Inc;


function parse($string)
{
  if (!$string || $string === '') return $string;
  $document = new \DOMDocument();
  // hide error syntax warning
  libxml_use_internal_errors(true);

  $document->loadHTML(mb_convert_encoding($string, 'HTML-ENTITIES', 'UTF-8'));
  $xpath = new \DOMXpath($document);

  parseIframe($xpath);

  return $document->saveHTML();
}


/**
 * parse iframe element
 */
function parseIframe(\DOMXpath $xpath): void
{
  // iframes settings is not empty
  $settings = namespace\gcc_value('settings');
  $iframesSettings = $settings->iframes;
  if (count($iframesSettings) === 0) return;

  // search wp-block-embed__wrapper in class
  $containers = $xpath->query("//div[contains(@class, 'wp-block-embed__wrapper')]");
  foreach ($containers as $key => $container) {
    [$iframe] = $xpath->query("//iframe", $container);
    if ($iframe) {
      $src = $iframe->getAttribute('src');
      // if src contain service name from $iframes
      $service = array_filter($iframesSettings, function ($item) use ($src) {
        return strpos($src, $item) !== false;
      });
      if (count($service) === 0) continue;

      $allow = $iframe->getAttribute('allow');
      $allowfullscreen = $iframe->getAttribute('allowfullscreen');
      $frameborder = $iframe->getAttribute('frameborder');

      $div = $container->ownerDocument->createElement('div');
      // service name
      $keys = array_keys($service);
      $service_name = $service[$keys[0]];
      // use id or not
      $iframes = namespace\get_iframes_settings();
      $useId = false;
      $data_id = '';
      if (array_key_exists($service_name, $iframes) && array_key_exists('settings', $iframes[$service_name]) && array_key_exists('useId', $iframes[$service_name]['settings'])) {
        $useId = $iframes[$service_name]['settings']['useId'];
        // extract id from src
        $src = explode('/', $src);
        $data_id = end($src);
      }
      $div->setAttribute('data-id', ($useId ? $data_id : $src));
      $div->setAttribute('data-service', $service_name);
      $div->setAttribute('data-allow', $allow);
      if ($allowfullscreen) {
        $div->setAttribute('data-allowfullscreen', $allowfullscreen);
      }
      if ($frameborder) {
        $div->setAttribute('data-frameborder', $frameborder);
      }
      $div->setAttribute('data-autoscale', '');
      $container->parentNode->replaceChild($div, $container);
    }
  }
}



/**
 * filter the content
 */
add_filter('the_content', function ($content) {
  return namespace\parse($content);
});
