export const profile = {
  name: 'Kai Takeuchi',
  positioning: 'Healthcare + AI Product Leader',
  location: 'Salt Lake City, Utah',
  linkedin: 'https://www.linkedin.com/in/kai-takeuchi/',
  github: 'https://github.com/ktakeuchi21',
};

export const navigation = [
  { label: 'Work', path: '/work/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'About', path: '/about/' },
];

export function withBase(path: string): string {
  if (/^(?:https?:|mailto:|#)/.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function externalLinkAttributes(href: string | URL | null | undefined, site: URL) {
  if (!href) return {};
  const destination = new URL(href, site);
  return /^https?:$/.test(destination.protocol) && destination.origin !== site.origin
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
