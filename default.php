<?php

namespace GoodmotionCookieConsent;


// add services
add_filter('gcc_list_services', function ($services) {
  $services = array_merge(
    [
      'google_analytics' => [
        'name' => 'Google Analytics',
        'slug' => 'google_analytics',
        'content' => [
          'col1' => '^_ga',
          'col2' => 'tagmanager.google.com',
          'col3' => __("Analytics", 'goodmotion-cookie-consent'),
          'is_regex' => true,
        ],
      ],
      'facebook_pixel' => [
        'name' => 'Facebook Pixel',
        'slug' => 'facebook_pixel',
        'content' => [
          'col1' => '^_fbp',
          'col2' => 'facebook.com',
          'col3' => __("Analytics", 'goodmotion-cookie-consent'),
          'is_regex' => true,
        ],
      ],
      'google_tag_manager' => [
        'name' => 'Google Tag Manager',
        'slug' => 'google_tag_manager',
        'content' => [
          'col1' => '^_ga',
          'col2' => 'tagmanager.google.com',
          'col3' => __("Analytics", 'goodmotion-cookie-consent'),
          'is_regex' => true,
        ],
      ],
      'linkedin_insight' => [
        'name' => 'Linkedin Insight',
        'slug' => 'linkedin_insight',
        'content' => [
          [
            'col1' => 'bcookie',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'bscookie',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'AnalyticsSyncHistory',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'UserMatchHistory',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'li_sugr',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'li_gc',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
          [
            'col1' => 'lidc',
            'col2' => 'linkedin.com',
            'col3' => __("Analytics", 'goodmotion-cookie-consent'),
            'is_regex' => true,
          ],
        ]
      ]
    ],
    $services
  );
  return $services;
}, 10, 1);



// add iframes
// https://github.com/orestbida/iframemanager/blob/main/demo/app.js
add_filter('gcc_list_iframes', function ($iframes) {
  $iframes = array_merge([
    'youtube' => [
      "name" => "Youtube",
      "slug" => "youtube",
      'content' => [
        'col1' => 'cc_youtube',
        'col2' => 'youtube.com',
        'col3' => __("Video Sharing", 'goodmotion-cookie-consent')
      ],
      'settings' =>
      [
        'embedUrl' => 'https://www.youtube-nocookie.com/embed/{data-id}',
        'useId' => true,
        'thumbnailUrl' => 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
        'iframe' => [
          'allow' => [
            'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            'frameBorder' => 0,
          ]
        ],
        'languages' => [
          'en' => [
            "notice" =>
            __("By clicking on \"Load content\", you accept the deposit of third-party cookies intended to offer you content.", 'goodmotion-cookie-consent'),
            "loadBtn" => __("Load once", 'goodmotion-cookie-consent'),
            "loadAllBtn" => __("Don't ask again", 'goodmotion-cookie-consent'),
          ]
        ]
      ]
    ],
    'vimeo' => [
      "name" => "Vimeo",
      "slug" => "vimeo",
      'content' => [
        'col1' => 'cc_vimeo',
        'col2' => 'vimeo.com',
        'col3' => __("Video Sharing", 'goodmotion-cookie-consent')
      ],
      'settings' =>
      [
        'embedUrl' => 'https://player.vimeo.com/video/{data-id}',
        'useId' => true,
        // 'thumbnailUrl' => 'async (dataId, setThumbnail) => {
        //         const url = `https://vimeo.com/api/v2/video/${dataId}.json`;
        //         const response = await (await fetch(url)).json();
        //         const thumbnailUrl = response[0].thumbnail_large;
        //         thumbnailUrl && setThumbnail(thumbnailUrl);
        // }',
        'iframe' => [
          'allow' => [
            'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            'frameBorder' => 0,
          ]
        ],
        'languages' => [
          'en' => [
            "notice" =>
            __("By clicking on \"Load content\", you accept the deposit of third-party cookies intended to offer you content.", 'goodmotion-cookie-consent'),
            "loadBtn" => __("Load once", 'goodmotion-cookie-consent'),
            "loadAllBtn" => __("Don't ask again", 'goodmotion-cookie-consent'),
          ]
        ]
      ]
    ],
    'dailymotion' => [
      "name" => "Dailymotion",
      "slug" => "dailymotion",
      'content' => [
        'col1' => 'cc_',
        'col2' => 'dailymotion.com',
        'col3' => __("Video Sharing", 'goodmotion-cookie-consent')
      ],
      'settings' =>
      [
        'embedUrl' => 'https://www.dailymotion.com/embed/video/{data-id}',
        'useId' => true,
        // 'thumbnailUrl' => 'async (id, setThumbnail) => {
        //         const url = `https://api.dailymotion.com/video/${id}?fields=thumbnail_large_url`;
        //         const response = await (await fetch(url)).json();
        //         const thumbnailUrl = response.thumbnail_large_url;
        //         thumbnailUrl && setThumbnail(thumbnailUrl);
        // ',
        'iframe' => [
          'allow' => [
            'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            'frameBorder' => 0,
          ]
        ],
        'languages' => [
          'en' => [
            "notice" =>
            __("By clicking on \"Load content\", you accept the deposit of third-party cookies intended to offer you content.", 'goodmotion-cookie-consent'),
            "loadBtn" => __("Load once", 'goodmotion-cookie-consent'),
            "loadAllBtn" => __("Don't ask again", 'goodmotion-cookie-consent'),
          ]
        ]
      ]
    ]
  ], $iframes);
  return $iframes;
}, 1, 1);
