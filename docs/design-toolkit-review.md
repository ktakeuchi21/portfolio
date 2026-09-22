# Design skills and interaction toolkit

Reviewed September 22, 2026 for Kai Takeuchi’s Astro portfolio.

## Recommendation

Keep the toolkit small: the installed UI/UX Pro Max skill, Anthropic’s frontend-design guidance, a pinned copy of Vercel’s interface review rules, and browser inspection. Use native CSS and browser animation first. Add GSAP for a specific interaction that needs coordinated timelines or scroll effects.

Strong composition, real imagery, typography, and purposeful movement can produce the polished result associated with hosted AI website builders. A paid builder is not a prerequisite. More skills do not necessarily produce better design; overlapping instructions can pull the work in different directions.

Free tools do not remove the cost or usage limits of the coding agent used to build with them.

## Skills worth considering

| Candidate | What it contributes | Decision for this site | Review scope |
| --- | --- | --- | --- |
| UI/UX Pro Max, already installed | Accessibility, responsive layout, typography, interaction guidance | Keep as the usability baseline. Preserve our established fonts and palette instead of accepting generic generated design systems. | Read the local skill and search entrypoint, inspected Python imports and sensitive operations, and ran targeted searches. This was not a full audit of its dataset. |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/34040c9c568585f6929bedeaad110ad08f079624/skills/frontend-design) | Visual direction, composition, distinctive interfaces, and critique | Best additional design skill. Trialed its guidance in the local experiment; not installed globally. | At the pinned revision, this skill directory contains only SKILL.md and an Apache 2.0 license. Read the full instructions. Found no instructions to retrieve credentials, upload project data, or execute a helper. This is a limited review, not a safety guarantee. |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines) | A practical review checklist for focus, semantics, images, responsiveness, and motion | Worth using as a pinned review reference after implementation. | Read the skill and its separately hosted [rule file](https://github.com/vercel-labs/web-interface-guidelines/blob/e3d624baaf29dc1fc645aff3e38f03e564d2d6b1/command.md). The skill asks agents to fetch rules from a moving main branch. Pin and review both files instead of silently accepting future changes. |
| [Impeccable](https://github.com/pbakaus/impeccable/tree/83c2c735777c68e30ea536ab9cc97f7843456945) | Broader design critique, polish, animation, and live iteration | Interesting second-stage candidate. Defer installation until its executable and browser tooling receive a focused review. | Reviewed the main skill, launcher, package metadata, and selected references. The launcher can download and execute a platform binary; optional hooks and live browser instrumentation expand its scope. Checksums are verified on fresh downloads, but that does not establish the binary’s behavior. The complete runtime was not audited or executed. |

The official Codex skill catalog also offers Figma workflows. They become useful when we have actual Figma designs to implement; they are not necessary for this Astro exploration. No catalog skills were installed.

## Free tools that create the interactions

Skills guide the coding agent. These tools implement effects in the visitor’s browser and need a separate dependency review.

| Tool | Best use here | Cost and fit |
| --- | --- | --- |
| CSS transforms, scroll snap, Web Animations API | Tactile shelves, restrained reveals, project selection, photo rails | Built into the browser. Used in this trial, with no added dependencies. |
| [GSAP](https://gsap.com/pricing/) | Coordinated project transitions, SVG workflow stories, and deliberate scroll sequences | The current pricing page lists the library and plugins as free. It has its own license; free is not the same as MIT-licensed. Use only the modules needed. |
| [Motion](https://motion.dev/docs/quick-start) | Spring motion and smaller JavaScript interactions | An alternative to GSAP, with a plain JavaScript API suitable for Astro. Its open-source core is separate from Motion+ premium features. Documentation search in its AI Kit is free; advanced AI Kit features require Motion+. Neither package is needed for this prototype. |
| [Codrops](https://tympanus.net/codrops/) | Inspiration and concrete interaction studies | Downloadable demos are generally [MIT-licensed unless otherwise stated](https://tympanus.net/codrops/licensing/). Inspect the individual demo, dependencies, and asset permissions before reusing it. No demo code or media was copied into this site. |

For this portfolio, start with the project spotlight and small tactile details. Elaborate 3D scenes, scroll hijacking, and continuous background animation add little to the product stories and increase maintenance. React component collections would also introduce a framework the current site does not use.

## Security findings and adoption rules

The concern about malicious skills is well founded. NVIDIA’s [SkillSpector README](https://github.com/NVIDIA/SkillSpector) cites a study of 31,132 skills in which 5.2% showed likely malicious intent. The [underlying research](https://arxiv.org/abs/2601.10338) describes high-severity patterns in a particular sample. This is not proof that one in twenty skills everywhere is confirmed malware.

A dangerous skill can steer an agent toward reading secrets, executing commands, changing security settings, or inserting a remote script. Risk exists even when the skill itself is only Markdown. A runtime dependency can introduce a separate risk in the deployed website.

For each proposed addition:

1. Retrieve the smallest relevant directory from the original publisher at an exact commit. Keep it inactive while reviewing it.
2. Read the instructions, linked references, scripts, hooks, install commands, dependency metadata, and remote destinations. Treat remotely loaded instructions as another dependency.
3. Reject unrelated credential access, uploads, permission changes, obfuscated commands, or automatic execution outside the task. Inspect broad access even when it has a plausible purpose.
4. Trial with existing public or synthetic site content, without production credentials or deployment access. Review the resulting diff and browser behavior before adopting it.
5. Pin the accepted version and re-review updates. Repository popularity and passing scanners are supporting signals, not guarantees.

[NVIDIA SkillSpector](https://docs.nvidia.com/skills/scanning-agent-skills) is worth considering as an additional gate for a larger skill collection. It supports static analysis and optional model-based analysis. Its own dependency list is substantial, so I reviewed its README and package metadata but did not install or run it. No scanner result is claimed in this review, and no private repository was sent to an external scanner.

Downloaded material remains inert in the gitignored `artifacts/design-skill-review-20260922/` directory. `reviewed-files.json` records the retrieved files, upstream commits, and SHA-256 hashes; it is an evidence inventory, not a certification that every referenced runtime file was audited. The initial review installed no new third-party skill, package, hook, or permission. The subsequent GSAP trial is documented below.

## Initial local trial: native motion

Open [the interaction notebook](http://127.0.0.1:4324/design/motion-studies/).

- **Project spotlight:** Pathway, What I Made, and Interlude share one stage. Selecting a project reveals its screenshot and existing summary. Includes keyboard tabs, visible focus, and reduced-motion handling.
- **Photo journal:** Existing diving, hiking, and beach photographs appear as tactile prints. Hover and keyboard focus lift a print; smaller screens use a horizontal rail. Captions stay visible without an interaction.

This is original Astro/CSS/TypeScript, informed by the reviewed design guidance. It uses existing content and local assets. It is a qualitative trial, not a controlled benchmark proving that one skill outperforms another.

The route is available only with `DESIGN_PREVIEW=1` and is marked noindex. Ordinary builds omit it. The live site has not been changed or deployed.

To rebuild the local study:

```sh
ASTRO_TELEMETRY_DISABLED=1 DESIGN_PREVIEW=1 npm run build
npm run preview -- --port 4324
```

## Initial trial validation

- Type check: 46 files, no errors, warnings, or hints.
- Ordinary production build: 11 pages and 345 local asset/link targets passed. Confirmed the design study route was absent.
- Opt-in design build: 16 pages and 1,589 local asset/link targets passed.
- Existing analytics regression checks passed. The study has no remote script tags.
- Browser inspection at 1280px and 390px: no page overflow or broken images observed. Verified project selection, Home/End/Down navigation, selected and hidden panels, focus visibility, and mobile photo scrolling.
- Source and built-HTML review: all project sections and anchors are available before JavaScript runs; CSS and JavaScript respect reduced motion. These two fallback modes were inspected in code, not separately emulated in the browser.
- No new dependencies. Browser animation support comes from native APIs.

Detailed local evidence is in `artifacts/design-skill-review-20260922/validation.json`. The downloaded candidates remain excluded from version control by the existing artifacts ignore rule.

## Follow-up: GSAP homepage trial

At Kai's request, the homepage now uses GSAP 3.15.0 and ScrollTrigger for:

- A short headline entrance and a drawn SVG underline.
- Once-per-load section and image reveals that start only when the content enters view.
- A soft background highlight on experience rows during hover or keyboard focus.
- Clickable project screenshots with a small pointer-following tilt, zoom, and an Explore project cue. Keyboard focus reveals the same cue with a visible outline.

The visual reference was Codrops' [Animated Product Grid Preview with GSAP & Clip-Path](https://tympanus.net/codrops/2025/05/27/animated-product-grid-preview-with-gsap-clip-path/). This implementation is original Astro/TypeScript within the existing card layout. No Codrops code, demo package, or media was imported.

GSAP was retrieved from the official npm registry, pinned exactly in package.json and package-lock.json, and installed with lifecycle scripts disabled. Its package metadata lists the official GreenSock repository and no dependencies or install scripts. This is a provenance and metadata review, not a full source-code audit or a security guarantee. No new agent skill was installed.

The animation bundle is served locally and loaded only on the homepage. The current build is 115,790 bytes, or 44,772 bytes when measured with gzip. No remote animation scripts, custom cursor, continuous animation, or scroll interception was added.

GSAP matchMedia contexts honor reduced motion and remove animation state and event listeners when the preference changes. Pointer-following effects require a fine pointer with hover support. Content and links are present in the initial HTML, and the Explore project cue stays visible without JavaScript or when motion is disabled.

Validation for the homepage trial:

- Astro check: 48 files, no errors, warnings, or hints.
- Design preview build: 17 pages and 1,689 local asset/link targets passed.
- Existing analytics regression checks passed.
- Browser inspection at 1280px and 390px: no horizontal overflow or broken images; project card alignment preserved.
- Verified pointer effects, keyboard focus, case-study navigation, browser Back restoration, and cleared hero animation styles. No browser errors or warnings were observed.
- Confirmed that About, Work, and Projects do not load the homepage animation bundle.
- Reduced-motion, touch-only, and JavaScript-free fallbacks were reviewed in source; those device/preference modes were not separately emulated in the browser.

The trial is available at [the local homepage](http://127.0.0.1:4324/). It has not been deployed.

## Follow-up: project transitions, architecture views, and photo stacks

Kai selected concepts 2, 3, and 6 for a second local trial.

- Project screenshots now share a named image transition with their case-study cover. Native cross-document view transitions keep normal navigation, URL handling, and browser Back/Forward behavior. Only the selected image participates. Unsupported browsers use ordinary navigation, and reduced motion disables the transition.
- Published project cards and case-study covers offer Product and Under the hood tabs. GSAP reveals a compact three-step architecture summary and draws its connecting lines. The six summaries in `src/lib/project-architecture.ts` are derived from the existing case studies, including the distinction between implemented behavior and disabled or future capabilities. Keep them in sync when those narratives change.
- The homepage About area and About page's personal section now use a three-photo stack. Clicking a photograph or using previous/next changes the front print. Arrow keys and Home/End work on the photographs; keyboard focus brings its photo forward. Visible captions and photo counts were removed at Kai's request. A screen-reader status announces selection changes.
- On tablets, homepage project cards use two columns so the diagrams remain readable. Desktop retains three aligned cards; phones use one column.

No additional dependency was installed for this follow-up. GSAP is now shared by the project visuals and photo stack on their respective pages, in addition to the original homepage motion. Navigation uses the browser's own transition support, documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition), rather than introducing a client router that would change existing component lifecycles.

Validation:

- Astro check: 52 files, no errors, warnings, or hints.
- Ordinary build: 11 pages and 381 local asset/link targets passed.
- Browser checks included desktop, tablet, 390px, and 320px layouts. Fixed the minimum-height/aspect-ratio combination that initially widened cards on small screens.
- Confirmed native transition events in both directions, restored scroll position, project category links, hidden inactive panels, tab keyboard controls, visible focus, photo selection, and mobile case-study diagrams.
- Existing analytics regression checks passed. No new remote assets or scripts were added.
- Reduced-motion changes finish active GSAP animations immediately. With JavaScript unavailable, product images and links remain usable, and all three personal photographs remain readable. These fallback paths were reviewed in source, not emulated with operating-system settings or a disabled-JavaScript browser.

This is still a local preview; no deployment was performed.
