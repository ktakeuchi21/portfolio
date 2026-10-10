interface ArchitectureStep { title: string; technology: string; }
interface ProjectArchitecture { steps: [ArchitectureStep, ArchitectureStep, ArchitectureStep]; note: string; }

// Short visual summaries of the corresponding MDX case studies, not new technical claims.
export const projectArchitecture: Record<string, ProjectArchitecture> = {
  'patient-access-orchestration': {
    steps: [
      { title: 'Define the policy', technology: 'Python rules & measurement' },
      { title: 'Export the behavior', technology: 'Versioned JSON manifests' },
      { title: 'Explore the workflow', technology: 'React · TypeScript · React Flow' },
    ],
    note: 'A browser simulation. No runtime backend.',
  },
  pathway: {
    steps: [
      { title: 'Start with the case', technology: 'Web workspace · TypeScript service' },
      { title: 'Retrieve the evidence', technology: 'PostgreSQL · pgvector' },
      { title: 'Answer with sources', technology: 'OpenAI Responses · citation checks' },
    ],
    note: 'Evidence stays attached for human review.',
  },
  'what-i-made': {
    steps: [
      { title: 'Capture a meal', technology: 'JavaScript PWA · local photos' },
      { title: 'Request optional help', technology: 'AWS Lambda · Transcribe · Bedrock' },
      { title: 'Review & save locally', technology: 'IndexedDB · Journal, Year & Map' },
    ],
    note: 'Cloud help is optional. Photos stay on-device.',
  },
  'ai-evaluation-governance-lab': {
    steps: [
      { title: 'Inspect a synthetic case', technology: 'Next.js · typed HTTP proxy' },
      { title: 'Run an explicit action', technology: 'FastAPI · simulator APIs' },
      { title: 'Keep service state separate', technology: 'PostgreSQL · isolated schemas' },
    ],
    note: 'Current build: manual actions, no agent execution.',
  },
  interlude: {
    steps: [
      { title: 'Prepare & review a lesson', technology: 'Source-based, versioned teaching' },
      { title: 'Save content & narration', technology: 'Cloudflare D1 · private R2 audio' },
      { title: 'Read, listen & return', technology: 'React PWA · versioned progress' },
    ],
    note: 'Saved narration plays without new synthesis.',
  },
  'table-for-one': {
    steps: [
      { title: 'Speak, type & review', technology: 'React · OpenAI transcription & extraction' },
      { title: 'Save & call on demand', technology: 'AWS · Twilio · OpenAI Realtime' },
      { title: 'Confirm or take over', technology: 'Order records · human intervention' },
    ],
    note: 'New build not deployed. Restaurant calling disabled.',
  },
};
