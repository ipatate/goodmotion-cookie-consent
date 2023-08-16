<?php

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
  $name = 'contentdisplay';
  // search wp-block-embed__wrapper in class
  $containers = $xpath->query("//div[contains(@class, 'wp-block-embed__wrapper')]");
  foreach ($containers as $key => $container) {
    [$iframe] = $xpath->query("//iframe", $container);
    if ($iframe) {
      $src = $iframe->getAttribute('src');
      $allow = $iframe->getAttribute('allow');
      $allowfullscreen = $iframe->getAttribute('allowfullscreen');
      $frameborder = $iframe->getAttribute('frameborder');

      $div = $container->ownerDocument->createElement('div');
      $div->setAttribute('data-id', $src);
      $div->setAttribute('data-service', 'video');
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
