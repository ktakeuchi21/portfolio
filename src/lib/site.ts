export const profile = {
  name: 'Kai Takeuchi',
  positioning: 'Healthcare + AI Product Leader',
  location: 'Salt Lake City, Utah',
  linkedin: 'https://www.linkedin.com/in/kai-takeuchi/',
  github: 'https://github.com/ktakeuchi21',
  // Set a public-relative path after a general public résumé is approved, e.g. /resume/kai-takeuchi.pdf.
  resumePath: null as string | null,
};

export const navigation = [
  { label: 'Work', path: '/work/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'About', path: '/about/' },
  { label: 'Resume', path: '/resume/' },
];

export function withBase(path: string): string {
  if (/^(?:https?:|mailto:|#)/.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
