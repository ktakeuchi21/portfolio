import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// CI supplies the actual Pages origin and base path. Local builds have no canonical origin.
const site = process.env.SITE_URL || undefined;
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  output: 'static',
  site,
  base: base === '/' ? '/' : `${base}/`,
  trailingSlash: 'always',
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
