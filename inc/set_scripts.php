<?php

namespace GoodmotionCookieConsent\Inc;

function set_scripts()
{
  $scripts = namespace\gcc_value('scripts');
  foreach ($scripts as $key => $value) {
    if ($value->activated === true && $value->type === 'analytics') {

      if ($key === 'google_analytics') {
        add_action('wp_head', function () use ($value) {

          $str = "<!-- Google tag (gtag.js) --><script type=\"text/plain\" data-cookiecategory=\"{$value->type}\" src=\"https://www.googletagmanager.com/gtag/js?id={$value->id}\"></script>";

          if ($value->template) {
            $str .= "<script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">";
            $str .= str_replace(['#id'], [$value->id], $value->template);
            $str .= "</script>";
          }
          echo $str;
        });
      }

      if ($key === 'google_tag_manager') {
        add_action('wp_head', function () use ($value) {

          $str = "<!-- Google Tag Manager -->
          <script type=\"text/plain\" data-cookiecategory=\"{$value->type}\" >(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',{$value->id});</script>
          <!-- End Google Tag Manager -->";


          if ($value->template) {
            $str .= "<script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">";
            $str .= str_replace(['#id'], [$value->id], $value->template);
            $str .= "</script>";
          }
          echo $str;
        });
      }


      if ($key === 'facebook_pixel') {
        add_action('wp_head', function () use ($value) {

          $str = "<!-- Meta Pixel Code -->
            <script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '{$value->id}');
            fbq('track', 'PageView');
            </script>
            <noscript><img height=\"1\" width=\"1\" style=\"display:none\"
            src=\"https://www.facebook.com/tr?id={$value->id}&ev=PageView&noscript=1\"
            /></noscript>
            <!-- End Meta Pixel Code -->";


          if ($value->template) {
            $str .= "<script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">";
            $str .= str_replace(['#id'], [$value->id], $value->template);
            $str .= "</script>";
          }
          echo $str;
        });
      }


      if ($key === 'linkedin_insight') {
        add_action('wp_head', function () use ($value) {

          $str = "<script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">
            _linkedin_partner_id = \"{$value->id}\";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            </script>
            <script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName(\"script\")[0];
            var b = document.createElement(\"script\");
            b.type = \"text/javascript\";b.async = true;
            b.src = \"https://snap.licdn.com/li.lms-analytics/insight.min.js\";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
            </script>";
          // <noscript>
          // <img height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https://px.ads.linkedin.com/collect/?pid={$value->id}&fmt=gif\" />
          // </noscript>


          if ($value->template) {
            $str .= "<script type=\"text/plain\" data-cookiecategory=\"{$value->type}\">";
            $str .= str_replace(['#id'], [$value->id], $value->template);
            $str .= "</script>";
          }
          echo $str;
        });
      }
    }
  }
}
