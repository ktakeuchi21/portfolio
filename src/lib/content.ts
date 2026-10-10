import { getCollection, type CollectionEntry } from 'astro:content';

export const projectCategories = [
  { id: 'professional', title: 'Healthcare', description: 'Healthcare and enterprise workflow prototypes, using synthetic cases to make the product decisions inspectable.' },
  { id: 'personal', title: 'Everyday life', description: 'Products for cooking, learning, and the small tasks of everyday life. Built around a specific need, with room to explore.' },
] as const;

// Homepage curation is independent of the complete Projects listing.
const homeSelections = {
  professional: { anchor: 'healthcare', slugs: ['patient-access-orchestration', 'ai-evaluation-governance-lab'] },
  personal: { anchor: 'everyday-life', slugs: ['next-chapter', 'table-for-one'] },
} as const;

export const homeProjectGroups = projectCategories.map(category => ({ ...category, ...homeSelections[category.id] }));

export const homeProjectSummaries: Record<string, string> = {
  'patient-access-orchestration': 'Exploring the decisions and human handoffs between a prescription and therapy initiation.',
  'ai-evaluation-governance-lab': 'Testing AI case preparation with source evidence, prompt comparisons, and human review.',
  'next-chapter': 'Turning photos and voice notes into inventory, pricing research, and resale listing drafts.',
  'table-for-one': 'A takeout assistant that turns a spoken request into a reviewed order and a delegated call.',
};

export const homeProjectThumbnails: Partial<Record<string, NonNullable<CollectionEntry<'projects'>['data']['image']>>> = {
  'next-chapter': {
    src: '/images/next-chapter-research.png',
    alt: 'Next Chapter’s item research screen, showing a proposed identification, suggested asking price, and assumptions for review.',
    width: 1110,
    height: 920,
  },
  'table-for-one': {
    src: '/images/table-for-one-order.png',
    alt: 'Table for One’s order composer in a simulation workspace, showing a spoken-order draft and editable order details.',
    width: 1440,
    height: 2998,
  },
};

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
