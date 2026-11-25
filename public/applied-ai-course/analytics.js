(() => {
  // Course traffic goes to its own PostHog project even though it shares a domain.
  if (location.origin !== 'https://kaitakeuchi.com') return;
  if (location.pathname !== '/applied-ai-course' && !location.pathname.startsWith('/applied-ai-course/')) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;

  const script = document.createElement('script');
  script.src = 'https://us-assets.i.posthog.com/static/array.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    if (!window.posthog || typeof window.posthog.init !== 'function') return;
    // This is a public, write-only project token, not an account API key.
    window.posthog.init('phc_sqkyoAmNDaFdtmjF3QWRkhC82sdAQBUKeuMMGKJNzWtm', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      person_profiles: 'never',
      persistence: 'sessionStorage',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      disable_surveys: true,
      capture_heatmaps: false,
      capture_dead_clicks: false,
      capture_exceptions: false,
      capture_performance: false,
      rageclick: false,
      respect_dnt: true,
      before_send: event => {
        if (!event || !['$pageview', '$pageleave'].includes(event.event)) return null;
        // Keep page paths, but omit query strings and URL fragments.
        for (const key of ['$current_url', '$referrer', '$initial_current_url', '$initial_referrer']) {
          if (!event.properties?.[key]) continue;
          try {
            const url = new URL(event.properties[key]);
            event.properties[key] = url.origin + url.pathname;
          } catch { delete event.properties[key]; }
        }
        for (const key of Object.keys(event.properties || {})) {
          if (/^(\$initial_)?utm_|^(gclid|fbclid|msclkid)$/.test(key)) delete event.properties[key];
        }
        return event;
      },
    });
  };
  document.head.appendChild(script);
})();
