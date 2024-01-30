<?php

namespace GoodmotionCookieConsent\Inc;

function get_list_iframes(): array
{
    $iframes = [];
    $iframes = apply_filters('gcc_list_iframes', $iframes);

    // return only slug
    $iframes = array_map(function ($value) {
        return $value['slug'];
    }, $iframes);

    return $iframes;
}

function get_list_services(): array
{
    $services = [];
    $services = apply_filters('gcc_list_services', $services);

    // return only name and slug
    $services = array_map(function ($value) {
        return [
            'name' => $value['name'],
            'slug' => $value['slug'],
        ];
    }, $services);

    return $services;
}

// create rest api route
function create_rest_route(): void
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
