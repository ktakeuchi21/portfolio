import { getCollection, type CollectionEntry } from 'astro:content';

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
