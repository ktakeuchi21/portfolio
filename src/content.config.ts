import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shared = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  date: z.coerce.date().optional(),
  image: z.object({
    src: z.string().startsWith('/images/'),
    alt: z.string().min(1),
    width: z.number().positive(),
    height: z.number().positive(),
    caption: z.string().optional(),
  }).optional(),
  liveDemo: z.url().optional(),
  github: z.url().optional(),
  caseStudy: z.url().optional(),
  tags: z.array(z.string()).default([]),
  // Draft bodies are not built; their intentional summaries still appear in listings.
  draft: z.boolean().default(true),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: shared.extend({
    type: z.literal('professional'),
    organization: z.string(),
    role: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: shared.extend({
    type: z.literal('personal'),
    label: z.string(),
  }),
});

export const collections = { work, projects };
