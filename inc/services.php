<?php

namespace GoodmotionCookieConsent\inc;

function get_services_settings()
{
    $services = [];

    $services = apply_filters('gcc_list_services', $services);

    return $services ?? [];
}

function get_iframes_settings()
{
    $iframes = [];

    $iframes = apply_filters('gcc_list_iframes', $iframes);

    return $iframes ?? [];
}
