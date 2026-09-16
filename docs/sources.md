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

The five screenshots come from Kai’s project documentation and demos, copied unchanged at his request. Interlude, What I Made, and Table for One were added or refreshed September 15, 2026; the new What I Made image came from the README-update checkout. No fictional employer interface or architecture was created. Project source URLs and third-party photo licenses are retained in `public/credits.txt`, accessible from the Projects page.

- `patient-access-workflow.png`: 1600 × 1150, the public site’s existing workflow-overview image.
- `pathway-workspace.png`: 1440 × 900, the public repository’s desktop workspace screenshot with a synthetic case.
- `what-i-made-map.png`: 390 × 844, the public repository’s fictional sample map screenshot, recaptured September 15 with the current country-density map. The source app’s complete media attribution is preserved to retain the provenance of any visible thumbnail fragments; its country boundaries use public-domain Natural Earth data.
- `interlude-today.jpg`: 1280 × 720, the public Interlude repository’s Today view, captured September 15 with a synthetic Demo profile and learning history. The same image appears on its project card and case-study cover.
- `table-for-one-order.png`: 1440 × 1496, copied from `docs/screenshots/desktop-order.png` in the private Table for One repository after Kai pushed the images and requested their use. The README identifies these as local-simulator screenshots with demo customer details and dummy payments. The image is used on the project card and case-study cover; no private repository link is offered as a public action.

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

## AI Evaluation & Governance Lab (September 16, 2026)

The case study is grounded in the public `ktakeuchi21/ai-evaluation-governance-lab` README at revision `e8c013b5497482714fcd8e3b1f100695e3e475ca`, its architecture documentation, and ADR 0003 on independent evaluation and human control. The published implementation is Milestone 2: persistent synthetic cases and explicit manual simulator actions. Agent runs, evaluation, durable human review, and analytical integrations remain planned. The narrative keeps those stages distinct and makes no outcome or compliance claims.

`public/images/ai-evaluation-workspace.png` is an unmodified browser capture of the running local Demo Alpha case workspace. Its 1152 × 1094 main-content capture shows only authored synthetic fixtures. No simulator action was submitted to create the screenshot. The source link is public; no live-demo link or local address is published. Design lessons summarize documented implementation choices rather than invented firsthand retrospectives.

Kai requested this project second in Healthcare and Clinician Matching last. Clinician Matching did not appear in the accessible GitHub repository list at the time of this update; its link has been requested before adding a narrative.
