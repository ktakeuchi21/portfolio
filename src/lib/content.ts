import { getCollection, type CollectionEntry } from 'astro:content';

export const projectCategories = [
  { id: 'professional', title: 'Healthcare', description: 'Healthcare and enterprise workflow prototypes, using synthetic cases to make the product decisions inspectable.' },
  { id: 'personal', title: 'Everyday life', description: 'Products for cooking, learning, and the small tasks of everyday life. Built around a specific need, with room to explore.' },
] as const;

export const projectStatuses = {
  'public-demo': 'Public demo',
  'private-app': 'Private app',
  'in-development': 'In development',
} as const;

export const projectOwnershipLabel = 'Independent build';

export async function getWork() {
  return (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export function caseStudyPath(entry: CollectionEntry<'work'> | CollectionEntry<'projects'>) {
  if (!entry.data.draft) return `/${entry.collection}/${entry.data.slug}/`;
  return entry.data.caseStudy;
}
