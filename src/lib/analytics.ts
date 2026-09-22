// Website IDs are public identifiers. Account credentials never belong in the site.
export const analyticsHosts = ['kaitakeuchi.com', 'www.kaitakeuchi.com'];
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
type EventData = Record<string, string | number>;
type Payload = {
  website: string;
  hostname: string;
  url: string;
  title: string;
  referrer: string;
  language: string;
  screen: string;
  name?: string;
  data?: EventData;
};
type AnalyticsWindow = Window & {
  umami?: { track: (payload: Payload) => Promise<unknown> };
};

export function analyticsUrl(href: string): string {
  const url = new URL(href);
  const campaign = new URLSearchParams();
  for (const key of campaignKeys) {
    const value = url.searchParams.get(key);
    if (value) campaign.set(key, value.slice(0, 100));
  }
  return url.pathname + (campaign.size ? `?${campaign}` : '');
}

export function referrerOrigin(referrer: string): string {
  try {
    const url = new URL(referrer);
    return /^https?:$/.test(url.protocol) ? url.origin : '';
  } catch { return ''; }
}

export function isAnalyticsHost(href: string): boolean {
  const url = new URL(href);
  return url.protocol === 'https:' && analyticsHosts.includes(url.hostname) && !url.port;
}

export function startAnalytics(websiteId: string) {
  const analyticsWindow = window as AnalyticsWindow;
  if (!/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(websiteId) ||
      !isAnalyticsHost(location.href)) return;

  function excluded(): boolean {
    try {
      return localStorage.getItem('umami.disabled') === '1' || navigator.doNotTrack === '1' ||
        (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    } catch { return true; }
  }

  // Owner shortcut, scoped to this browser. No preference is sent to Umami.
  const preference = new URL(location.href).searchParams.get('analytics');
  if (preference === 'off' || preference === 'on') {
    try {
      if (preference === 'off') localStorage.setItem('umami.disabled', '1');
      else localStorage.removeItem('umami.disabled');
    } catch { return; }
  }
  if (excluded()) return;

  const pending: Payload[] = [];
  let ready = false;
  let failed = false;
  let sending = Promise.resolve();

  function send(payload: Payload) {
    sending = sending.then(async () => {
      if (excluded() || failed) return;
      try { await analyticsWindow.umami?.track(payload); } catch { /* Analytics never blocks the page. */ }
    });
  }

  function record(name?: string, data?: EventData) {
    if (failed || excluded()) return;
    const payload: Payload = {
      website: websiteId,
      hostname: location.hostname,
      url: analyticsUrl(location.href),
      title: document.title,
      referrer: referrerOrigin(document.referrer),
      language: navigator.language,
      screen: `${screen.width}x${screen.height}`,
      ...(name ? { name, data } : {}),
    };
    if (ready) send(payload);
    else if (pending.length < 20) pending.push(payload);
  }

  // One view per document. Tab/anchor changes are events, not extra page views.
  record();
  const tracker = document.createElement('script');
  tracker.src = 'https://cloud.umami.is/script.js';
  tracker.defer = true;
  tracker.dataset.websiteId = websiteId;
  tracker.dataset.autoTrack = 'false';
  tracker.dataset.domains = analyticsHosts.join(',');
  tracker.dataset.doNotTrack = 'true';
  function abandon() {
    failed = true;
    pending.length = 0;
    tracker.remove();
  }
  const deadline = window.setTimeout(abandon, 10000);
  tracker.addEventListener('error', () => { clearTimeout(deadline); abandon(); }, { once: true });
  tracker.addEventListener('load', () => {
    clearTimeout(deadline);
    if (failed || !analyticsWindow.umami) { abandon(); return; }
    ready = true;
    pending.splice(0).forEach(send);
  }, { once: true });
  document.head.append(tracker);

  function outbound(event: MouseEvent) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!anchor) return;
    const url = new URL(anchor.href);
    if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;
    record('outbound-link', {
      destination: `${url.origin}${url.pathname}`,
      label: (anchor.getAttribute('aria-label') || anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
    });
  }
  document.addEventListener('click', outbound);
  document.addEventListener('auxclick', outbound);
  document.addEventListener('portfolio:project-category', event => {
    const category = (event as CustomEvent<string>).detail;
    if (category === 'Healthcare' || category === 'Everyday life') record('project-category', { category });
  });

  // These are visible-page milestones, not a claim of active reading time.
  const milestones = [30000, 60000];
  let visibleTime = 0;
  let visibleSince = document.hidden ? null : performance.now();
  let timer: number | undefined;
  function updateVisibility() {
    clearTimeout(timer);
    const now = performance.now();
    if (visibleSince !== null) visibleTime += now - visibleSince;
    visibleSince = document.hidden ? null : now;
    while (milestones.length && visibleTime >= milestones[0]) {
      record(`visible-${milestones.shift()! / 1000}s`);
    }
    if (visibleSince !== null && milestones.length && !failed && !excluded()) {
      timer = window.setTimeout(updateVisibility, Math.max(0, milestones[0] - visibleTime));
    }
  }
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();

  let scrolled = false;
  window.addEventListener('scroll', () => {
    if (scrolled || document.hidden) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    if (available > 0 && window.scrollY / available >= 0.75) {
      scrolled = true;
      record('scroll-75');
    }
  }, { passive: true });
}
