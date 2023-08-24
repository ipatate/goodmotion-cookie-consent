<?php

namespace GoodmotionCookieConsent\inc;

function get_services()
{
  return [
    'google_analytics' => [
      [
        'col1' => '^_ga',
        'col2' => 'tagmanager.google.com',
        'col3' => __("cc_block.ga_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
    ],
    'facebook_pixel' => [
      [
        'col1' => '^_fbp',
        'col2' => 'facebook.com',
        'col3' => __("cc_block.fbp_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
    ],
    'google_tag_manager' => [
      [
        'col1' => '^_ga',
        'col2' => 'tagmanager.google.com',
        'col3' => __("cc_block.ga_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
    ],
    'linkedin' => [
      [
        'col1' => 'bcookie',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'bscookie',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'AnalyticsSyncHistory',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'UserMatchHistory',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'li_sugr',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'li_gc',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
      [
        'col1' => 'lidc',
        'col2' => 'linkedin.com',
        'col3' => __("cc_block.lkdin_description", 'goodmotion-cookie-consent'),
        'is_regex' => true,
      ],
    ],
    'youtube' => [
      [
        'col1' => 'cc_youtube',
        'col2' => 'youtube.com',
        'col3' => __("cc_block.video_description", 'goodmotion-cookie-consent')
      ],
    ],
    'vimeo' => [
      [
        'col1' => 'cc_vimeo',
        'col2' => 'vimeo.com',
        'col3' => __("cc_block.video_description", 'goodmotion-cookie-consent')
      ],
    ],
  ];
}
