<?php

namespace PressWind\Inc;


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

    $_class = $container->getAttribute('class');

    // remplace iframe
    $fragment = $container->ownerDocument->createDocumentFragment();

    $clone = $container->cloneNode(); // Get element copy without children
    $clone->appendChild($fragment);
    $container->parentNode->replaceChild($clone, $container);
    if ($iframe) {
      // switch src to data-src
      $src = $iframe->getAttribute('src');
      $iframe->setAttribute('data-src', $src);
      $iframe->removeAttribute('src');
    }
  }
}



/**
 * filter the content
 */
// add_filter('the_content', function ($content) {
//   return namespace\parse($content);
// });
