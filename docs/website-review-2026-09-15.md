# Portfolio review

September 15, 2026. Reviewed the current local preview at `http://127.0.0.1:4324/`, using independent editorial and technical reviewers plus a browser walkthrough. This report evaluates the local version, not the older public deployment. No website content or code was changed during the review.

The site has a consistent visual style, clear ownership labels, and working navigation. The largest opportunity is to show more evidence of Kai’s professional product decisions. A few case-study sentences also need editing before this version is published.

## Priorities

| Priority | Improvement | Why it matters | Suggested scope |
| --- | --- | --- | --- |
| Highest content value | Add one substantive professional case study | The homepage’s primary action opens a Work page that repeats its four short summaries | Start with one compact Optum Match story using existing public facts and Kai’s actual decisions |
| Correct before publication | Remove internal editing language and clarify Table for One’s available experience | Current copy includes an instruction to the writer and an ambiguous live-calling claim | Two focused case-study edits |
| Next | Make contacting Kai an explicit next step | LinkedIn is available, but the pages do not invite a conversation | Add a clearly labeled LinkedIn action after Work or near the About introduction |
| Next | Add shortcuts within About | Its books, podcasts, and photos make a long mobile page | Link to Background, Books, Listening, and Outside of work |
| Next | Clarify the About projects action | A link following the cooking paragraph opens Healthcare by default | Use neutral “Explore my projects” wording, or link explicitly to Everyday life |
| Useful launch polish | Add a social sharing image | Shared links have titles and descriptions but no deliberately selected preview image | One branded default image, with optional case-specific images later |
| Later editorial work | Make one lesson per project concrete | Principles explain good judgment, but specific changes would make Kai’s contribution easier to assess | Add an actual initial approach, observation, decision, and result or remaining question |

## 1. Give Work a substantial example

The hero’s “Explore my work” action leads to `/work/`. Home and Work render the same four Work entries, and all four employer narratives remain drafts. Work concludes with a promise of forthcoming case studies. The page therefore adds little evidence beyond what a visitor has already seen on Home.

Optum Match is the strongest starting point in the current material: its existing summary identifies Kai as the founding product manager and includes a funding milestone. A compact story could explain the original problem, Kai’s responsibility, one consequential product decision, and a supported result or milestone. It does not require a long narrative or a collection of new metrics. Only include facts Kai can substantiate and share.

Keep Syneos first in the experience order, as requested. Adding depth to Optum Match does not require changing that order. Until fuller stories exist, consider removing the “forthcoming” promises so the summaries read as a deliberate presentation rather than unfinished pages.

Evidence: [Hero.astro](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/components/Hero.astro:10>), [Work page](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/pages/work/index.astro:10>), [Optum Match](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/work/optum-match.mdx:7>).

## 2. Correct two case-study passages

Interlude’s final paragraph contains “It should not be described as an independent cloud scheduler.” That is an editing instruction rendered as website copy. It can state the implementation directly: “I currently prepare and publish new content through a separate research workflow.” The same paragraph’s discussion of whether a repository link is offered, and Table for One’s similar closing sentence, sound like research notes. Preserve useful product status information while removing commentary about assembling the portfolio.

Table for One’s experience section says the person “then starts a call or a clearly labeled simulation.” Later sections say restaurant calling remains disabled. These can be reconciled by leading with the current simulator experience and identifying the live-calling architecture as implemented but awaiting controlled validation. The “In development” label is useful, but a skimming reader should not have to reach the final paragraph to understand this distinction.

Evidence: [Interlude](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/projects/interlude.mdx:67>), [Table for One experience](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/projects/table-for-one.mdx:33>), [Table for One status](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/projects/table-for-one.mdx:67>).

## 3. Make the next step explicit

The LinkedIn and GitHub footer links work as available contact paths. A modest “Connect with me on LinkedIn” action would make the invitation clearer after a visitor reads the work. This can use the existing profile; a contact form, public email address, and claims of availability are not necessary.

Evidence: [Footer.astro](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/components/Footer.astro:8>).

## 4. Help visitors navigate About

At a 390px viewport width, About measured approximately 7,542px tall. The learning collection occupies about 2,564px, and “Outside of work” begins around 5,594px down the page. This is a navigation opportunity, not a reason to discard the approved resources or photos.

Small in-page links near the introduction would let readers jump to Background, Books, Listening, or Outside of work. Keep the approved “Favorites on my shelf” and “What I tune into” headings and the requested absence of introductions and personal notes in those collections.

The action after the cooking paragraph is also worth clarifying. Clicking “Explore the personal projects” currently opens `/projects/` with Healthcare selected. All independent projects are personal builds, so the label is not inherently false, but the cooking context makes the default destination potentially surprising. “Explore my projects” would make a general catalog link clearer. If the intention is to continue into cooking and learning apps, use an Everyday life label and `/projects/#personal`.

Evidence: [About layout and action](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/pages/about.astro:32>), [mobile learning layout](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/components/LearningCollection.astro:61>). Browser measurements and click reproduction support these observations.

## 5. Improve shared-link presentation

The shared layout emits page titles and descriptions but no `og:image` or Twitter image. Add one intentional default social image with an absolute production URL. Project-specific images can follow later. Production canonical configuration is already supplied from GitHub Pages settings; the absence of a canonical origin in this local preview is intentional.

Evidence: [SiteLayout.astro](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/layouts/SiteLayout.astro:21>).

## 6. Make project lessons more personal and specific

The architecture and stack sections are concrete. Some design lessons still read as general principles, such as “Activity is not proof of understanding.” One actual decision story per project would add useful evidence: the first approach, what Kai noticed, the change, and what happened or still needs evaluation. These details must come from Kai’s experience or documented implementation history. Do not invent user research, impact, or personal takeaways.

This applies to project case studies, not the book and podcast collection, where personal notes were explicitly declined.

Evidence: [What I Made](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/projects/what-i-made.mdx:61>), [Interlude](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/content/projects/interlude.mdx:61>).

## Lower-priority technical polish

- Project cards and case-study covers serve the same original PNG/JPEG assets without responsive variants. Their combined source payload is only about 673KB, so this is a modest optimization opportunity. Use the existing Astro image approach to provide smaller thumbnails, while retaining larger images for inspection. See [ProjectCard.astro](</Users/kaitakeuchi/Documents/ChatGPT/Portfolio webpage/src/components/ProjectCard.astro:15>).
- A production sitemap would make page discovery explicit. It is optional polish for this small, internally linked site, not a publishing prerequisite.

## What is working

- The typography, restrained colors, compact homepage hero, and consistent spacing give the portfolio a coherent presentation.
- Healthcare and Everyday life describe subject matter clearly. “Independent build” consistently distinguishes these projects from employer experience.
- Case studies include useful product questions, screenshots, architecture, stack, and implementation boundaries.
- Books, podcasts, photography, and the family paragraph make About personal without adding a generic learning introduction.
- The résumé removal is intentional and is not a gap in this review.

## Verification and limits

- Astro check: 29 files, zero errors, warnings, or hints.
- Current build verification: 10 pages and 222 local asset/link targets passed.
- Browser review: 20 route/viewport combinations at 390px and 1440px widths, covering Home, Work, both Projects categories, About, and all five case studies. Full navigations returned HTTP 200; switching category hashes used same-document navigation.
- No horizontal overflow, duplicate IDs, broken visible images, or incorrect primary-heading counts were found. Checked navigation/action controls were at least 44px tall. No browser page errors occurred.
- Tab clicks, arrow keys, Home/End, browser Back/Forward, direct category links, and the About project action were exercised. Without JavaScript, all five projects remained visible and the enhanced tab bar was absent.
- Source color calculations passed normal-text AA for the primary text and button combinations. This was not a screen-reader certification or a real-device usability study.
- External destinations and public deployment state were not re-audited in this pass. The latest work remains local.
- Browser review script: `output/playwright/site-review-audit.js`. Screenshots include `audit-work-390.png`, `audit-work-1440.png`, `audit-about-1440.png`, and `audit-projects-everyday-390.png` in the same ignored directory.

The next iteration should start with the small case-study corrections, clearer project/contact actions, and About shortcuts. The highest-value content work after that is one substantive professional story.

## Follow-up implementation

Kai selected items 2–6 from the review's conversation summary. The case-study copy, LinkedIn invitation, About shortcuts, Everyday life project destination, and social preview are now implemented in the local build. Interlude states its publishing workflow directly. Table for One introduces the simulator before discussing live-call architecture. About links to Background, Books, Listening, and Outside of work, with shortcuts preceding the portrait on mobile. Work and About both have an explicit LinkedIn contact action.

The shared 1200 × 630 social card uses the existing fonts, colors, name, and positioning. Sharing metadata respects the configured production origin and base path. This implementation does not constitute a public deployment. Detailed validation is recorded in `docs/verification.md`.
