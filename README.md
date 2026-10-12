# Kai Takeuchi: portfolio

A static Astro + TypeScript portfolio for healthcare and AI product building. Tailwind CSS supplies the theme tokens and utility layer; Astro components provide the layouts. MDX content collections generate project listings and detail pages. There is no backend, external font request, or client-side framework. Optional Umami analytics runs only on the production domain when configured.

**Live website: [kaitakeuchi.com](https://kaitakeuchi.com/)**

## What’s on the site

- **Home and Work:** selected experience at Syneos Health, Optum Match, UnitedHealthcare ACA, and Optum Virtual Care, in that order. Below the homepage hero, sticky section navigation tracks Experience, Projects, and About me. Healthcare and Everyday life are nested under Projects and jump to consecutive sections, each with two wider project cards. On mobile, both category links stay visible beneath the section links.
- **Projects:** Healthcare and Everyday life tabs, with nine independent builds. Product (or Workflow) and Under the hood views pair screenshots or diagrams with compact architecture summaries. Case studies include the product question, architecture, stack, design decisions, and current state.
- **About:** background, an interactive personal photo stack, a compact shelf of 21 favorite books organized by topic, a coverflow browser for 13 podcasts, and ten favorite episodes across Lenny’s Podcast and How I AI.
- **Accessible browsing:** keyboard navigation, visible focus, touch scrolling, reduced-motion support, and readable content with JavaScript disabled.

Employer experience is separate from independent projects. Healthcare describes the subject of a project; case studies carry the ownership label **Independent build**. Listing cards omit the repeated label.

| Category | Case study | Current status |
| --- | --- | --- |
| Healthcare | [Patient Access Orchestration](https://kaitakeuchi.com/projects/patient-access-orchestration/) | Public synthetic demo |
| Healthcare | [AI Evaluation & Governance Lab](https://kaitakeuchi.com/projects/ai-evaluation-governance-lab/) | In development; Foundry evaluations, source comparison, saved assessments, and section walkthroughs implemented |
| Healthcare | [Briefing Room](https://kaitakeuchi.com/projects/briefing-room/) | In development; source-linked pre-call briefs, review controls, and recorded evaluation evidence; third in Healthcare, excluded from the homepage |
| Healthcare | [Pathway](https://kaitakeuchi.com/projects/pathway/) | Public synthetic demo |
| Everyday life | [Next Chapter](https://kaitakeuchi.com/projects/next-chapter/) | Private app; staged marketplace integrations, eBay approval pending |
| Everyday life | [Oʻahu Flow Lab](https://kaitakeuchi.com/projects/oahu-flow-lab/) | Private app; public case study, second in Everyday life |
| Everyday life | [What I Made](https://kaitakeuchi.com/projects/what-i-made/) | Private app with a fictional public sample |
| Everyday life | [Interlude](https://kaitakeuchi.com/projects/interlude/) | Private app |
| Everyday life | [Table for One](https://kaitakeuchi.com/projects/table-for-one/) | In development |

## Stack

Astro 7, TypeScript 6, MDX content collections, and Tailwind CSS 4 generate a static site. Small Astro scripts enhance tabs, shelves, and carousels. Locally bundled GSAP adds homepage entrances, project architecture reveals, and photo transitions. Native cross-document view transitions connect project thumbnails to case-study covers in supported browsers. Motion respects reduced-motion preferences. Book covers, podcast artwork, and personal photos use Astro’s responsive image pipeline. Inter and Newsreader fonts are self-hosted. GitHub Actions validates and deploys to GitHub Pages; Cloudflare manages the custom domain’s DNS.

## Local development

Use **Node 24 LTS** and **npm 11 or later** (`.nvmrc` is provided).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro, normally `http://127.0.0.1:4321/`.

Astro 7 runs its development and preview servers in the background. Use `npm exec -- astro dev status` to find the current development URL and `npm exec -- astro dev stop` to stop it. Use `preview status` or `preview stop` instead for a production preview. If a port is occupied, use the URL Astro actually prints.

```sh
npm run check
npm run verify:analytics
npm run build
npm run verify:build
npm run preview
```

`check` validates Astro and TypeScript. `verify:build` checks generated pages, local links, images, font URLs, metadata, draft-route exclusion, and removal of the résumé route. If running inside a restricted sandbox, prefix Astro commands with `ASTRO_TELEMETRY_DISABLED=1` to avoid Astro trying to store telemetry preferences outside the project.

`npm run verify:content` temporarily adds entries in both project categories and employer Work, proves that they generate cards and detail routes, then removes them and restores the normal build. Use it when changing the content infrastructure, not for ordinary copy edits. Avoid running content builds alongside the development server: Astro shares its content cache. Use the production preview after validation to inspect the final catalog.

Routes include `/`, `/work/`, `/projects/`, `/about/`, `/404.html`, the nine case studies listed above, and `/project-notes/briefing-room/evaluation/`. The résumé route is intentionally absent.

## Visitor analytics

The portfolio uses its own **Kai Takeuchi Portfolio** entry in Umami Cloud Hobby. On September 22, 2026, the owner approved deleting Pathway's analytics entry and history to free the account's website slot. The portfolio has a new website ID; Pathway's retired ID is not reused. No paid plan is required.

View the [private portfolio dashboard](https://cloud.umami.is/analytics/us/websites/a5fed162-9914-4594-9688-665df6e082f0) while signed into the owner's Umami account. Collection starts with the portfolio's activation; there is no historical backfill or public dashboard link.

Set the public GitHub Actions repository variable `PUBLIC_UMAMI_WEBSITE_ID` to the portfolio website ID, then rebuild and deploy. `.env.example` documents the equivalent local build setting. This identifier is public; no account credentials or API keys are needed. Tracking requires a production build with the real `SITE_URL` and an exact HTTPS `kaitakeuchi.com` or `www.kaitakeuchi.com` browser location. Localhost, preview domains, design mocks, and unconfigured builds do not load the Umami tracker.

Collected events are page views, `outbound-link` (destination without query/hash and public link label), `project-category` (Healthcare or Everyday life, including keyboard selection), `visible-30s`, `visible-60s`, and `scroll-75`. Visibility timers pause while the page is hidden; they measure visible time, not attention. Scroll completion and each time milestone are recorded once per page load. Anchor changes do not inflate page views. URLs retain only UTM campaign parameters; referrers are reduced to their origin. No visitor identity, replay, heatmap, or performance recording is enabled.

To exclude your own browser, visit `https://kaitakeuchi.com/?analytics=off` after deployment. This stores Umami's standard `umami.disabled=1` preference on that origin. Use `?analytics=on` to re-enable tracking. Do Not Track and Global Privacy Control are respected. Ad blockers, network failures, and very short visits can cause undercounting. Tracker failures never interrupt navigation. Tests should intercept collection rather than send synthetic traffic to the live dashboard.

After changing the website ID or tracker, verify a controlled visit in the private Umami dashboard before reporting collection as live. Account website/event limits and retention depend on the selected plan.

## Add or update content

Add an MDX file in `src/content/projects/` or `src/content/work/`. The shared schema is in `src/content.config.ts`. Slugs use lowercase letters, digits, and hyphens. Keep each slug unique within its collection.

Example personal project:

```yaml
---
title: A new product
slug: a-new-product
category: personal
ownership: independent
status: in-development
role: Product design and prototyping
audience: The intended user
summary: A concise explanation of the product problem and approach.
featured: false
order: 4
draft: false
tags: [Product discovery, Workflow design]
---
```

Write the narrative below the frontmatter. The route `/projects/a-new-product/` and listing card are generated automatically. Images and external URLs are optional, as is `date`; do not create dates just to fill metadata.

The homepage uses explicit project selections and short summaries in `src/lib/content.ts`, independent of listing order and the legacy project `featured` field. Healthcare shows Patient Access Orchestration and AI Evaluation & Governance Lab, followed by Everyday life with Next Chapter and Oʻahu Flow Lab. Update `homeSelections` and `homeProjectSummaries` to change these pairs. Compact homepage cards use equal-height previews, a linked title, and a short description; status, stack, demos, and source links remain in the case studies and full Projects listing. Homepage links `/#healthcare` and `/#everyday-life` scroll to their sections. Back/Forward restores the reading position, and both groups remain visible with or without JavaScript.

Projects use `category: professional` for the **Healthcare** tab and `category: personal` for **Everyday life**, with `ownership: independent` for their origin. Both use “Independent build” on case studies. The existing `/projects/#professional` and `/projects/#personal` links select the corresponding tab; without JavaScript, both sections and their anchor links remain available. Category names, descriptions, and status labels live in `src/lib/content.ts`.

`status` is `public-demo`, `private-app`, or `in-development`. Status is independent of `draft`: an unfinished product can have a complete, published narrative.

For employer Work, use `type: professional`, `organization`, and `role` in `src/content/work/`. Set `featured: true` to include an experience on the homepage. An optional `website` URL adds a “Visit website” action and links the title when no case study is published. `order` controls the order on both Home and Work. These entries are separate from independent projects. Work pages automatically use `/work/<slug>/` when their narratives are published.

Case studies support reusable `ArchitectureFlow.astro` (numbered, responsive steps and an optional boundary note) and `TechnologyStack.astro` (layer, tools, and purpose). Import these in MDX as shown in the existing entries. Explain product decisions and source-grounded design takeaways; keep unconfirmed firsthand reflections in ignored local notes.

`ProjectVisual.astro` renders Product and Under the hood views for published projects. The optional `visualLabel` changes the first tab to Workflow for a diagram. Its three-step summaries live in `src/lib/project-architecture.ts`; keep them aligned with the MDX narrative and clearly distinguish implemented behavior from planned capabilities. Without a summary, a project retains its image. The tabs support arrow keys, Home/End, and visible focus; inactive panels are excluded from keyboard navigation.

Next Chapter uses the original illustrated `public/images/next-chapter-workflow.svg` both as a standalone still image and inline through `NextChapterWorkflow.astro`. Its optional Play/Pause/Replay control runs a six-second GSAP sequence. It pauses offscreen or in a background tab and returns to the complete still when switching views or enabling reduced motion. No animation starts automatically. Keep the public Next Chapter README's copy of the SVG in sync when changing the artwork. The case-study caption identifies automatic sale monitoring and delisting as planned.

The homepage shows actual app screenshots for Next Chapter and Oʻahu Flow Lab. `homeProjectThumbnails` retains overrides for Next Chapter and Table for One; Oʻahu Flow Lab uses its case-study image. Next Chapter shows its item research and pricing panel; Table for One shows the earlier simulator's order composer. The equal-height thumbnails frame the top of each screenshot. The full Projects listing and case-study covers retain the workflow diagrams.

### Drafts and external case studies

- `draft: true` is the safe default: the MDX body does not become a public route, but its intentionally written summary is visible on the listing page. Draft frontmatter is **not private storage**.
- A completed local narrative with `draft: false` gets an internal case-study link automatically.
- For an existing external narrative, keep the local entry as a draft and set `caseStudy` to its full HTTPS URL. The card links there.
- `liveDemo` and `github` accept complete URLs. Omit them if unavailable. Never expose a private repository link as a public action.
- Unfinished cards show “Case study forthcoming” without a dead link. Keep unapproved information out of visible frontmatter.

### Images

Place images in `public/images/` and use:

```yaml
image:
  src: /images/a-new-product.png
  alt: Describe what the actual image shows.
  width: 1440
  height: 900
  caption: Optional source or context.
```

Use real, appropriate screenshots; entries without imagery use a text layout. Retain attribution in `public/credits.txt`. Current screenshots come from public demos, repository assets, and local synthetic workspaces. User-supplied portraits and personal photos live in `src/assets/`; Astro produces their responsive derivatives. Source and font-license records are in `docs/sources.md` and `public/licenses/`.

MDX body links to local pages/assets must also respect deployment subpaths. Import `withBase` from `../../lib/site` inside the MDX file and use `<a href={withBase('/projects/')}>Projects</a>` for a local link rather than hardcoding `/projects/`. Use external HTTPS links normally.

External website links open a new tab with `target="_blank"` and `rel="noopener noreferrer"`; internal navigation stays in the current tab. Shared link components and card titles apply this rule, while `ContentLink.astro` handles Markdown links in case-study bodies. Book, podcast, episode, and video destinations use the same attributes, including their no-JavaScript fallback links. The build verifier checks every generated anchor so new links follow the convention.

### Profile links and future résumé

Edit `src/lib/site.ts` for profile URLs and site identity. The résumé page and all résumé navigation links are intentionally removed for launch. The supplied application PDFs are reference-only and are not in this repository.

If a general public résumé is added later, restore a dedicated page or link, add an approved PDF under `public/`, and use `withBase()` for its download URL. Update the route verifier at the same time.

### Social preview

All pages share `public/images/social-preview.png`, a 1200 × 630 typographic card using the site's fonts and colors. The editable artwork is `scripts/social-preview.html`. To refresh it, serve that template and its two local font files, render it in Chromium at 1200 × 630 with a device scale factor of 1, wait for `document.fonts.ready`, and capture the viewport to the PNG path. The template is not a public website route.

`SiteLayout.astro` supplies Open Graph and Twitter image URLs, dimensions, and alt text. Production URLs follow `SITE_URL` and `BASE_PATH`; unconfigured local builds use Astro's local origin. The build verifier checks the PNG dimensions and sharing metadata, including deployments under a subpath.

### About bookshelf and podcast player

`src/data/learning.ts` holds the approved books, podcasts, and video channel. `BookShelf.astro` uses the selected overlapping ledge from `BookCarousel.astro`: one horizontal row of real front covers, with hover, keyboard focus, or a tap revealing the selected book. Covers share a fixed display height and keep their natural proportions; the available width derives from the widest cover in the collection. Obviously Awesome and Supercommunicators use flat front artwork without the earlier mockup backgrounds. Scrolling, dragging, swiping, previous/next controls, arrow keys, and Home/End support browsing; an explicit link opens the selected book's destination. Reduced motion removes transitions. Without JavaScript, all book links remain available with full covers. The Books shortcut targets the section's `h2`. The current collection has 21 books. Topic tabs filter this same row into Product & technology, Leadership & culture, Strategy & communication, and Mindset & growth. All books is the default. Tabs support arrow keys, Home/End, visible focus, and proper tab/panel relationships; hidden books are excluded from keyboard navigation. Without JavaScript, the topic controls stay hidden and all 21 book links remain available. Add each new book and its `category` in `src/data/learning.ts`.

`PodcastPlayer.astro` uses the selected coverflow variant of `PodcastCarousel.astro`: a dark gallery with angled covers, reflections, horizontal scrolling, swipe/drag, arrow controls, and an explicit link to open the selected show. The collection contains 13 podcasts. Counters and looping derive from the data; layout measurements are cached on resize to keep scrolling smooth. Arrow keys and Home/End move selection and keyboard focus. Reduced-motion preferences remove animated transitions and use immediate programmatic scrolling. Decorative loop copies do not enter the tab order or accessibility tree. Without JavaScript, all original podcast links remain in a scrollable row. This is a browsing interface; audio opens at the podcast destination. AHealthcareZ remains a separate YouTube link.

`FavoriteEpisodes.astro` uses one compact horizontal row beneath two accessible show tabs. `src/data/favoriteEpisodes.ts` holds six Lenny’s Podcast episodes and four How I AI episodes in Kai’s specified order, with verified titles, guests, artwork, and direct destinations. Tabs support arrows and Home/End; cards support Tab, arrows, Home/End, native scrolling, and touch swipes. Previous/next controls move through each show’s row, and hidden panels are excluded from navigation. Full titles remain readable. The Favorite episodes shortcut targets `#learning-episodes`; `#episodes-lenny` and `#episodes-how-i-ai` also select their corresponding panels. Without JavaScript, both labeled rows and all ten episode links remain available. Images are responsive and lazy-loaded.

The selected bookshelf and podcast player use compact cover sizes, title/creator rows, and controls, without extra collection labels or instruction rows. New entries extend the horizontal collections instead of adding rows. Keep full titles readable and transport targets at least 44px when adjusting density.

On About, both collections rotate whenever they intersect the viewport: books advance every 5 seconds and podcasts every 5.2 seconds, with 0.9-second transitions. Books reverse at the ends of the selected topic; podcasts loop through their buffered covers. Playback does not require focus and continues on hover or after following a section link. Header controls and Escape explicitly pause a collection. Touch and drag gestures briefly hold playback, wheel browsing restarts the dwell, and active keyboard browsing holds playback until focus leaves its controls. These interactions resume automatically without requiring Play. Hidden tabs and offscreen collections do no rotation work, and reduced-motion preferences disable automatic playback. Automatic title updates are silent to assistive technology. Caption space is measured at each width so long titles remain readable without shifting the page. Design studies retain manual browsing.

### Homepage color system

Forest is the selected site theme. `src/styles/global.css` supplies warm ivory `#FAF8F0`, forest ink `#253D2C`, and green `#325E3B` accents across the site. The homepage hero uses deep green `#183B28`, cream `#FFF8E5` type and controls, and a light content area below. Button, hover, selection, and focus colors follow semantic tokens; the favicon and browser theme color match. The approved Forest preview shares the hero styles with the actual homepage, while other explorations keep their own treatments.

### Homepage color explorations

Five live homepage color previews are available at `/design/home-colors/` in development, or with `DESIGN_PREVIEW=1` for a preview build. The bottom selector switches between Cobalt & Chalk, Terracotta & Linen, Mulberry & Porcelain, Petrol & Sea Glass, and Midnight & Amber. Arrow keys and Home/End work within the selector; the `palette` query parameter preserves a shareable choice without affecting the ordinary homepage. A second study at `/design/home-colors-bold/` uses much stronger colored canvases: Acid Press, Tomato Studio, Bubblegum & Espresso, Pool Blue & Oxblood, and Carbon & Signal. Older selectors link to the latest warm palette study. Tokens for all studies live in `src/data/home-palettes.ts`. The preview and production homepage share `HomePageContent.astro`, including current project selections and screenshots. These routes are marked `noindex`, disable analytics, and are omitted from ordinary production builds.

The reference study, `/design/home-colors-references/`, applies five references to the shared homepage. Each option links to the source website. These are adaptations of observed color roles, with some text colors darkened for contrast, rather than exact reproductions:

- [Oura](https://ouraring.com/): sand `#F7F1E8`, charcoal `#4A4741`, and a small olive `#CED4B8` panel. Verified in the live page and public CSS.
- [Pentagram](https://www.pentagram.com/): white, ink `#1A1A1A`, gray rules, and restrained red details. The site's red token is `#E52222`; this study uses darker `#C7192D` for small text on light surfaces.
- [Apple](https://www.apple.com/): a black hero over white content, light-gray surfaces, blue `#0071E3` buttons, and `#0066CC` links. The section contrast follows the live homepage's dark and light product sections.
- [Linear](https://linear.app/): graphite `#08090A`, off-white `#F7F8F8`, light `#E5E5E6` controls, and small lilac `#828FFF` accents. Values inspected in live computed styles.
- [Stripe](https://stripe.com/): white and navy `#061B31`, violet `#533AFD` controls, and a pale decorative gradient confined to the hero's right edge. The gradient is an original, quieter adaptation of Stripe's colorful hero; the text and control colors were sampled from live styles.

Research inspected on October 10, 2026. Headline, button, and navigation colors are independent tokens in the reference study. Existing layout, project screenshots, and content are preserved. No external code, fonts, or images from these references are loaded into the previews.

The newest study, `/design/home-colors-warm/`, removes blue and purple from the theme tokens and offers Espresso, Forest, Vermilion, Ochre, and Cocoa. The selector labels its sources “Inspired by” because these are original adaptations, not copies of brand specifications:

- Espresso borrows [Aesop](https://www.aesop.com/)’s warm neutral approach, using parchment, dark brown, and a caramel role panel.
- Forest adapts [Flamingo Estate](https://flamingoestate.com/)’s olive/ivory relationship into a deep green hero over light content. It does not use the reference site's teal announcement strip.
- Vermilion follows [Leica](https://leica-camera.com/en-US)’s mostly white and charcoal presentation, using red only in controls and small details.
- Ochre adapts [Mailchimp](https://mailchimp.com/)’s yellow controls and warm dark ink, softening the yellow and keeping it to the primary button and role panel.
- Cocoa adapts [Ghia](https://drinkghia.com/)’s cream/pink relationship into chocolate, vanilla, and pale rose. The dark brown canvas is original to this preview; Ghia's live site uses cream with burgundy ink.

Sources inspected October 10, 2026. Theme colors, buttons, hero text, and role panels pass normal-text AA contrast checks. Existing project screenshots retain their original colors. These previews share the same local-only build flag and keyboard-accessible selector as the other studies.

### Podcast design explorations

Four interactive alternatives are available at `/design/podcasts/` when building with `DESIGN_PREVIEW=1 npm run build` (or starting dev with `DESIGN_PREVIEW=1 npm run dev`). Ordinary builds omit this route. The comparison page has `noindex` metadata and does not replace the About page's player.

`src/components/design/PodcastMock.astro` renders a warm console, an editorial spread, a dark cover fan, and a compact queue. These first-round explorations retain the original five-show sample, support cyclic browsing, arrow keys and Home/End, and link to the actual shows. Touch swipes and horizontal wheel gestures browse the artwork. No audio playback, generated artwork, paid service, or new runtime dependency is involved. Open-source design references are linked on the comparison page.

A second comparison at `/design/record-crates/` develops the selected dark gallery direction: curved fan, 3D coverflow, flat gallery rail, and vinyl sleeves. `RecordCrateMock.astro` wraps the shared `PodcastCarousel.astro` for these explorations, so all four use the current collection and carousel behavior. The selected coverflow is also used on About. Both comparison routes require `DESIGN_PREVIEW=1` and are excluded from ordinary builds.

### Bookshelf design explorations

Six interactive alternatives at `/design/bookshelves/` use the same opt-in `DESIGN_PREVIEW=1` flag: gallery wall, reading desk, book spotlight, expanding library, cover constellation, and reading folio. `BookshelfGallery.astro` provides the comparison page and `BookshelfMock.astro` renders each direction using the 11 existing book covers and destinations. The first-round designs remain available for comparison; About uses the overlapping ledge from the second round below.

Each preview supports selection, previous/next controls, arrow keys, Home/End, and an explicit destination link. The desk also supports dragging and swiping; the expanding library responds to hover as well as selection. Mobile layouts, visible keyboard focus, reduced motion, and no-JavaScript destination links are included. These are original CSS layouts with a small Astro script, no new runtime dependencies or generated artwork. The comparison page is `noindex` and omitted from ordinary builds.

A focused second round at `/design/book-ledges/` combines the gallery wall and expanding library using real front covers: overlapping ledge, turning shelf, pocket shelf, and leaning library. Each stays in one horizontal row, with native scrolling, mouse dragging, hover/focus/tap reveal, and previous/next controls. `ShelfRailMock.astro` wraps the shared `BookCarousel.astro`, which derives books and counts from the learning data; adding books extends the row without adding height. The overlapping ledge is now the selected About design. These previews use no generic spine artwork and retain the same opt-in build flag. `ShelfRailGallery.astro` provides the comparison.

## GitHub Pages publishing

The public source repository is [ktakeuchi21/portfolio](https://github.com/ktakeuchi21/portfolio). GitHub Pages uses **GitHub Actions** and the custom domain `kaitakeuchi.com`. See `docs/deployment.md` for the domain configuration and verification status.

To publish an update:

1. Review the content, run the checks below, and commit the intended changes with the lockfile tracked.
2. Push to `main`. **Validate and deploy portfolio** builds and publishes automatically. Pull requests run validation only.
3. Confirm that the Actions run succeeds and inspect the changed page at the public domain. The workflow can also be run manually from Actions.

The workflow installs from the lockfile, checks the source, builds, verifies the output, reads the repository’s actual Pages settings, and builds again for that destination. It uploads only `dist/` and deploys that validated artifact. Permissions are scoped per job. It does not create a repository or automatically enable Pages.

`SITE_URL` supplies the origin and `BASE_PATH` supplies a repository subpath. CI takes them from `actions/configure-pages`; do not guess a repository name. Local builds omit canonical and `og:url` metadata when `SITE_URL` is unset.

To reproduce root and repository-subpath hosting locally:

```sh
SITE_URL=https://ktakeuchi21.github.io BASE_PATH=/ npm run build
SITE_URL=https://ktakeuchi21.github.io BASE_PATH=/ npm run verify:build

# This is a test subpath, not an assumed repository name.
SITE_URL=https://ktakeuchi21.github.io BASE_PATH=/portfolio-test/ npm run build
SITE_URL=https://ktakeuchi21.github.io BASE_PATH=/portfolio-test/ npm run verify:build
BASE_PATH=/portfolio-test/ npm run preview

# Restore a normal local build afterward.
npm run build
```

Use the same environment when starting preview as when building. `withBase()` handles local navigation and public assets; Vite handles bundled stylesheet and font paths. GitHub Pages uses the generated `404.html`, whose home link also respects the subpath.

### Custom domain: kaitakeuchi.com

The domain is registered and managed at Cloudflare, verified under Kai's GitHub account, and assigned in this repository's Pages settings. The apex A records and `www` CNAME point directly to GitHub Pages with Cloudflare proxying disabled. Keep the GitHub verification TXT record in place.

The Pages action reads the custom origin and empty base path from GitHub's settings. After a domain or HTTPS setting changes, rebuild and check canonical URLs, assets, nested pages, and the 404 link. Local development still omits canonical metadata unless `SITE_URL` is supplied.

For custom Actions deployments, GitHub’s Pages setting is authoritative; a source `CNAME` is not needed for this workflow. Consult the official instructions rather than reusing potentially stale DNS addresses:

- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind’s Astro integration](https://tailwindcss.com/docs/installation/framework-guides/astro)

## Content and review status

See `docs/content-status.md` for the nine project narratives and deferred content, `docs/verification.md` for validation evidence and limits, and `docs/deployment.md` for hosting configuration. Clinician Matching is pending a verified repository link. Private content questions are in ignored `artifacts/project-content-review.md`; browser review scripts, captures, and research downloads are excluded from Git.
