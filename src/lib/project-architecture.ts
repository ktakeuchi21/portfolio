interface ArchitectureStep { title: string; technology: string; }
interface ProjectArchitecture { steps: [ArchitectureStep, ArchitectureStep, ArchitectureStep]; note: string; visualLabel?: string; }

// Short visual summaries of the corresponding MDX case studies, not new technical claims.
export const projectArchitecture: Record<string, ProjectArchitecture> = {
  'next-chapter': {
    visualLabel: 'Workflow',
    steps: [
      { title: 'Capture and keep context', technology: 'React · D1 · private R2 media' },
      { title: 'Research and propose', technology: 'OpenAI · durable Cloudflare Workflows' },
      { title: 'Review and hand off', technology: 'Etsy drafts · Chrome helper' },
    ],
    note: 'eBay approval pending. Live sale sync and automatic delisting are planned.',
  },
  'patient-access-orchestration': {
    steps: [
      { title: 'Define the policy', technology: 'Python rules & measurement' },
      { title: 'Export the behavior', technology: 'Versioned JSON manifests' },
      { title: 'Explore the workflow', technology: 'React · TypeScript · React Flow' },
    ],
    note: 'A browser simulation. No runtime backend.',
  },
  'briefing-room': {
    steps: [
      { title: 'Inspect the case packet', technology: 'Three records · frozen cases' },
      { title: 'Generate with sources', technology: 'OpenAI Responses API · reference checks' },
      { title: 'Review, approve & save', technology: 'React · exact passages · local JSON' },
    ],
    note: 'One model call. Expected answers stay outside the prompt.',
  },
  pathway: {
    steps: [
      { title: 'Choose a role and case', technology: 'Web workspace · Render' },
      { title: 'Find relevant passages', technology: 'Supabase · PostgreSQL · pgvector' },
      { title: 'Answer with sources', technology: 'GPT-5 mini · citation checks' },
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
      { title: 'Run a controlled experiment', technology: 'Microsoft Foundry · GPT-5 mini' },
      { title: 'Compare outputs with sources', technology: 'Next.js · independent task checks' },
      { title: 'Save a reviewer assessment', technology: 'FastAPI · SQLite' },
    ],
    note: 'Versioned prompts and evidence stay attached to each run.',
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
    visualLabel: 'Workflow',
    steps: [
      { title: 'Speak, type & review', technology: 'React · OpenAI transcription & extraction' },
      { title: 'Save & call on demand', technology: 'AWS · Twilio · OpenAI Realtime' },
      { title: 'Confirm or take over', technology: 'Order records · human intervention' },
    ],
    note: 'New build not deployed. Restaurant calling disabled.',
  },
};
