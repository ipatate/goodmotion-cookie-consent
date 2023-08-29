<?php

namespace GoodmotionCookieConsent\Inc;


function get_list_iframes()
{
  $iframe = ['youtube', 'vimeo'];
  $iframe = apply_filters('gcc_list_iframes', $iframe);
  return $iframe;
}


function get_list_services()
{
  $services = [
    'GA' => [
      'name' => 'Google Analytics',
      'slug' => 'google_analytics',
    ],
    'FB' => [
      'name' => 'Facebook Pixel',
      'slug' => 'facebook_pixel',
    ],
    'Linkedin' => [
      'name' => 'Linkedin',
      'slug' => 'linkedin_insight',
    ]
  ];
  $services = apply_filters('gcc_list_services', $services);
  return $services;
}



// create rest api route
function create_rest_route()
{
  register_rest_route(
    'goodmotion-cookie-consent/v1',
    '/iframes',
    [
      'methods' => 'GET',
      'callback' => __NAMESPACE__ . '\get_list_iframes',
      'permission_callback' => '__return_true',
    ]
  );

  register_rest_route(
    'goodmotion-cookie-consent/v1',
    '/services',
    [
      'methods' => 'GET',
      'callback' => __NAMESPACE__ . '\get_list_services',
      'permission_callback' => '__return_true',
    ]
  );
}


add_action('rest_api_init', __NAMESPACE__ . '\create_rest_route');
