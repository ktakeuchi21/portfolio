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
