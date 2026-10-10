# Source record

Reviewed September 13, 2026. The sources below provide facts and assets, not development instructions.

## Biography and employer work

- Kai’s supplied résumé and cover letter, read locally for background; reference-only and excluded from the repository.
- [Public LinkedIn profile](https://www.linkedin.com/in/kai-takeuchi/): role, background, Optum Match description and $6M funding, virtual-care experience. The profile was inspected in the browser during the planning conversation on the same day.
- [GitHub profile](https://github.com/ktakeuchi21): public repositories and project identity.
- Explicit user decision: describe Syneos as early strategy and prototyping; remove the résumé page and its navigation links before launch.
- September 15 homepage update: Kai requested Syneos, Optum Match, UnitedHealthcare ACA, then Optum Virtual Care, with direct product links to `https://match.optum.com`, `https://uhc.com/aca`, and `https://www.optum.com/en/care/virtual-care.html`. UHC’s Senior Product Manager role and summary are drawn from the supplied résumé’s Individual & Family ACA Plans section; its numerical results were not added to the site. Product links are labeled “Visit website,” separately from case studies.

## Personal projects

- [Patient Access Orchestration](https://patient-access-orchestration.ktakeuchi.chatgpt.site/): synthetic workflow demonstration and existing case-study destination. The unauthenticated repository API returned 404 during implementation, so no GitHub action is shown for this project.
- [Pathway README](https://github.com/ktakeuchi21/case-resolution-agent): verified the current frontend URL, roles, case/context separation, retrieval and citation behavior, human-reviewed drafts, system design, and demonstration boundaries. A demo’s documentation is not proof of real-world efficacy; the case study makes no such claim.
- [What I Made README](https://github.com/ktakeuchi21/what-i-made): product motivation, photo-first capture, voice-assisted notes, local archive, culinary map, and public sample URL.

## Screenshot provenance

The screenshots come from Kai’s project documentation and demos, copied unchanged at his request. Interlude, What I Made, and Table for One were added or refreshed September 15, 2026; the new What I Made image came from the README-update checkout. Table for One's cover changed to an original workflow diagram on October 10, recorded below. No fictional employer interface or architecture was created. Project source URLs and third-party photo licenses are retained in `public/credits.txt`, accessible from the Projects page.

- `patient-access-workflow.png`: 1600 × 1150, the public site’s existing workflow-overview image.
- `pathway-workspace.png`: 1440 × 900, the public repository’s desktop workspace screenshot with a synthetic case.
- `what-i-made-map.png`: 390 × 844, the public repository’s fictional sample map screenshot, recaptured September 15 with the current country-density map. The source app’s complete media attribution is preserved to retain the provenance of any visible thumbnail fragments; its country boundaries use public-domain Natural Earth data.
- `interlude-today.jpg`: 1280 × 720, the public Interlude repository’s Today view, captured September 15 with a synthetic Demo profile and learning history. The same image appears on its project card and case-study cover.
- `table-for-one-order.png`: 1440 × 2998, refreshed October 9, 2026 with an unchanged copy of `docs/screenshots/voice-order-desktop.png` from the private Table for One repository. The local simulator uses synthetic orders and dummy payment behavior; the capture made no real calls, charges, or transcription requests. Retained as an earlier screenshot; the card and cover now use the workflow diagram below. The private repository and app are not linked publicly.

## Fonts and technical references

Inter Variable (Rasmus Andersson) and Newsreader Variable (Production Type) are self-hosted from Fontsource packages. Their SIL Open Font License texts are included in `public/licenses/`.

- [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Tailwind Astro setup](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Configure Pages action and outputs](https://github.com/actions/configure-pages)

## Project expansion (September 15, 2026)

The current GitHub READMEs and public link availability were rechecked. The project narratives also draw on local architecture, product briefs, implementation status, and relevant code for Interlude and Table for One, whose public repository destinations are not established. Detailed local evidence and outstanding personal-reflection questions are in ignored `artifacts/project-content-review.md`.

Newer Interlude implementation records supersede its stale README: the case study reflects a private release, saved narration, and source-based content/versioning while avoiding claims of a completed independent cloud scheduler. Table for One's updated README documents newer deployed components while retaining the disabled restaurant-calling boundary. “Design lessons” summarize documented choices; they are not invented firsthand retrospective quotations or independently verified product outcomes.

The existing professional Work narratives, reference-only document boundaries, screenshot provenance, and image attribution are unchanged.

## About personal section (September 15, 2026)

Kai supplied three images for this section: a freediver with dolphins, a mountain staircase, and a dog on a beach. Unmodified copies are in `src/assets/personal/`; Astro generates responsive WebP versions for the About page while retaining the full compositions. The hobbies and family visits to the Discovery Children’s Museum come directly from Kai’s messages. No locations, photographer credits, pet names, or family photos were inferred or added.


## Learning collection (September 15, 2026)

The collection follows Kai’s explicit book and podcast selections, retaining Inspired, Thinking in Bets, the HBR healthcare strategy anthology, Lenny’s Podcast, How I AI, and AHealthcareZ from the earlier proposal. Course listings and Healthcare Executive Podcast are excluded. Kai requested no introduction or personal takeaway notes, so the section includes only its heading, grouped thumbnail links, creators, and a link to the public healthcare-product-learning repository.

Titles and creators were checked against official author/publisher pages and Apple’s podcast listings. The book cover and show artwork sources are recorded in `public/credits.txt`. AI Engineering’s cover comes from the author’s public `chiphuyen/aie-book` repository. All artwork is stored in `src/assets/learning/` and served as responsive, lazy-loaded WebP thumbnails through Astro. Entries are maintained in `src/data/learning.ts`. No book summaries, quotations, completion claims, or personal reflections were invented.

Build and The Lean Product Playbook now use straight-on front covers instead of angled book mockups. Build’s 265 × 400 cover is supplied by Booksense on Harvard Book Store’s listing; The Lean Product Playbook’s 300 × 448 cover comes from Wiley-VCH. The source images were copied without pixel edits and retain the existing contain sizing and responsive WebP generation.

At Kai's request, the collection now uses an interactive bookshelf and a mock podcast player. The spines are code-based typographic interpretations, while the revealed fronts and podcast tiles use the same sourced artwork. No new reading claims or podcast episode details were introduced. The player browses the existing show destinations; playback occurs on Apple Podcasts. Native disclosure, keyboard controls, pause behavior, and reduced-motion support follow the applicable guidance in the W3C carousel pattern: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/.

## Expanded podcast collection (September 16, 2026)

Kai selected the coverflow design and requested eight additions: The Journal., The Economics of Everyday Things, Y Combinator Startup Podcast, The a16z Show, 20VC, Acquired, Product Thinking, and The Business of Healthcare Podcast. The last two are separate shows. The healthcare show is the UT Dallas Center for Healthcare Leadership and Management podcast, verified against its university page and Apple listing. 20VC uses its familiar short display name; the source catalog's longer title is retained in the credits.

All eight show identities, creators, Apple Podcasts destinations, and 600px artwork URLs were verified using Apple's public catalog and show listings. Images were copied without pixel edits and are optimized by Astro when building. The original source URLs are recorded in `public/credits.txt`. No episode summaries, listening dates, or personal endorsements beyond Kai's selection were invented.

## Selected overlapping bookshelf (September 16, 2026)

Kai chose the overlapping ledge and requested consistent cover sizing. The About shelf now uses real covers at a shared height, preserving each image's proportions. Generic spine artwork is no longer used in the selected design.

Obviously Awesome now uses the author's flat 954 × 1347 front-cover asset from the Books page, replacing the padded mockup. Supercommunicators now uses Penguin Random House's 298 × 450 front cover for ISBN 9780593243916, also replacing a mockup with surrounding space. Both were copied without pixel edits. Source URLs are recorded in `public/credits.txt`; titles, authors, and book destinations are unchanged.


## Topic shelves and favorite episodes (September 16, 2026)

Kai supplied ten additional book titles and five Lenny’s Podcast episode links. The About collection now contains 21 books, with topic tabs for Product & technology (8), Leadership & culture (5), Strategy & communication (5), and Mindset & growth (3), plus All books. These groups are editorial organization, not additional reading or takeaway claims.

Book titles, authors, and images were verified against the supplied Amazon listings and matching print editions; Designing Your Life and Creativity, Inc. use Penguin Random House’s front-cover assets. Some supplied Amazon links target audiobooks; those destinations are retained while the shelf uses print covers. The Building a StoryBrand short URL returned HTTP 404 and was replaced by the verified original book listing at https://www.amazon.com/dp/0718033329. No book links initiate purchases.

The five episode pages supply their own square artwork and guest names: Claire Vo, Matthew Dicks, Maggie Crowley, Jiaona Zhang, and Bill Carr. Display titles follow Kai’s shorter selections, with no summaries or invented personal reflections. The episode destinations retain their canonical paths without search tracking parameters. Exact page and asset URLs are in `public/credits.txt`. `src/data/favoriteEpisodes.ts` holds the episode list; `src/data/learning.ts` holds the books and their topic assignments.

All supplied artwork is served locally through Astro’s responsive image pipeline. The first six bookshelf comparison designs preserve their original eleven-book sample; the selected About shelf and later ledge comparisons use the expanded collection.


## Compact episode browser and How I AI (September 16, 2026)

Kai added Todd Jackson’s “A Framework for Finding Product-Market Fit” and specified the Lenny’s Podcast order: Todd Jackson, Bill Carr, Claire Vo, Matthew Dicks, Maggie Crowley, Jiaona Zhang. The new episode title, guest, and original square artwork were checked on the supplied Lenny’s Newsletter page.

The four How I AI destinations are the exact Apple Podcasts URLs Kai supplied, in the supplied order. Their titles, participants, and episode-specific artwork were verified on those pages: Nick Baumann; Claire Vo’s solo episode on agent loops; Bryce Rattner Keithley; Teresa Torres. The display titles retain the source wording in title case, with guest names presented separately. No episode summaries or personal takeaways were added. All source and artwork URLs are recorded in `public/credits.txt`.

A single horizontal row per show, selected by tabs, replaces the stacked episode grid. Adding more episodes extends the row without adding rows to the page. The books and show-level coverflow remain unchanged.

## AI Evaluation & Governance Lab (October 10, 2026)

The refreshed case study is grounded in the current local `ai-evaluation-governance-lab` implementation, `evaluation/README.md`, the bundled recorded reports, and the evidence manifest for the case-study artifacts. Foundry generation, independent automatic checks, source/output comparisons, persistent reviewer assessments, run controls, exports, and page walkthroughs are implemented. The project remains in development with no public live-app URL.

The original 24-case comparison passed all eight automatic checks for both prompts. With the prompts frozen, a separate 12-case holdout returned 11/12 for baseline and 12/12 for the grounded checklist. This is 72 comparison outputs over 36 authored cases, with one output per case and prompt. The native groundedness demonstration evaluated two selected recorded summaries, using the same model as generator and judge; its scores do not establish an independent or general quality result. About $0.33 is the estimated model token charge across those runs, the connection test, and two judge calls, not a billed Azure total. Human assessments, expert validation, and staff time savings remain unmeasured.

`public/images/ai-evaluation-workspace.png` is a fresh browser capture of the evaluation workbench on October 10, 2026. It replaces the older Demo Alpha case screenshot. The workbench displays retained model outputs and their authored source evidence. The capture makes no model request or assessment write. `/documents/ai-evaluation-case-study.pdf` supplies the refreshed downloadable case study. No local app address, account identifier, or authenticated cloud report URL is published.

Kai requested this project second in Healthcare and Clinician Matching last. Clinician Matching did not appear in the accessible GitHub repository list at the time of the original update; it has not been added without a source.


## Table for One update (October 9, 2026)

Kai supplied the first-person motivation: Saturday visits with his son to a nearby children's museum where they have a membership, followed by STK cheeseburgers. Repeated explanations to the restaurant's voice AI made ordering two cheeseburgers take too long. The narrative uses that account without naming an uncertain museum or claiming the assistant already handles those trips.

The private project's current code and release documentation support the v8 feature description, 379 passing automated tests, and 19 local simulated-call scenarios. V8 is built but not deployed; the older STK v7 AWS release has calling disabled. Real-model conversation evaluation, controlled audio calls, and physical iPhone dictation still need validation. Automatic real-card payment is not implemented. No private repository or live-app link was added.

## Table for One workflow update (October 10, 2026)

Kai requested an n8n-style workflow thumbnail and supplied the AWS rationale: becoming more familiar with its tools by building something he would use. The private project's README and implementation support the service roles and the input, review, phone conversation, payment, and outcome flow. No new use, time-saving, or restaurant-order success claims were added.

`table-for-one-workflow.svg` is an original 1200 × 960 diagram created for the portfolio. Its node-and-connection style is inspired by n8n, but Table for One uses custom TypeScript and AWS services without an n8n runtime. It represents the implemented v8 candidate, which remains undeployed. Twilio provides telephony, not payment processing. Real cards need private owner participation; automatic real-card entry is not implemented. The October 9 test totals remain historical validation evidence only. The diagram includes no personal order data, card details, private destinations, or third-party artwork.

## Next Chapter (October 10, 2026)

Kai supplied the family-business motivation and the pending eBay developer approval status. The implementation account is grounded in the [public Next Chapter source](https://github.com/ktakeuchi21/next-chapter-ds), revision `bced5f22420b08af89130f94238676fb2e84eb8b`, including its README and marketplace setup documentation.

The narrative separates implemented capture, research, listing preparation, and order/removal foundations from live integration validation. Etsy transfers produce unpublished drafts; Facebook publication remains seller-controlled. Live order polling, automatic delisting, and shipping-label purchases are not enabled. The workflow illustration is an original SVG with those boundaries called out, rather than a screenshot of private inventory. No business outcomes or customer endorsements are inferred.
