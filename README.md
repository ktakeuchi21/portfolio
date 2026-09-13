# Kai Takeuchi — portfolio foundation

A static Astro + TypeScript portfolio for healthcare and AI product leadership. Tailwind CSS supplies the theme tokens and utility layer; Astro components provide the layouts. MDX content collections generate project listings and detail pages. There is no backend, analytics, external font request, or client-side framework.

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
npm run build
npm run verify:build
npm run preview
```

`check` validates Astro and TypeScript. `verify:build` checks generated pages, local links, images, font URLs, metadata, draft-route exclusion, and the résumé placeholder. If running inside a restricted sandbox, prefix Astro commands with `ASTRO_TELEMETRY_DISABLED=1` to avoid Astro trying to store telemetry preferences outside the project.

`npm run verify:content` temporarily adds a personal and professional MDX fixture, proves that both generate cards and detail routes, then removes them and restores the normal build. Use it when changing the content infrastructure, not for ordinary copy edits.

The initial routes are `/`, `/work/`, `/projects/`, `/about/`, `/resume/`, `/projects/pathway/`, and `/404.html`.

## Add or update content

Add an MDX file in `src/content/projects/` or `src/content/work/`. The shared schema is in `src/content.config.ts`. Slugs use lowercase letters, digits, and hyphens. Keep each slug unique within its collection.

Example personal project:

```yaml
---
title: A new product
slug: a-new-product
type: personal
label: Personal project
summary: A concise explanation of the product problem and approach.
featured: false
order: 4
draft: false
tags: [Product discovery, Workflow design]
---
```

Write the narrative below the frontmatter. The route `/projects/a-new-product/` and listing card are generated automatically. Set `featured: true` to include it on the homepage. Images and external URLs are optional, as is `date`; do not create dates just to fill metadata.

For professional work, use `type: professional` and add `organization` and `role` instead of `label`. Published work pages automatically use `/work/<slug>/`. Suggested narrative sections: Challenge, Role, Approach, Product decisions, Outcome, and What I learned.

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

Use real, approved screenshots or the built-in neutral placeholder. Retain attribution in `public/credits.txt`, with any relevant visible attribution on the Projects page. Current screenshots are unmodified public project assets. Source and font-license records are in `docs/sources.md` and `public/licenses/`.

MDX body links to local pages/assets must also respect deployment subpaths. Import `withBase` from `../../lib/site` inside the MDX file and use `<a href={withBase('/projects/')}>Projects</a>` for a local link rather than hardcoding `/projects/`. Use external HTTPS links normally.

### Résumé and profile links

Edit `src/lib/site.ts` for profile URLs and site identity. The supplied application PDFs are reference-only and are not in this repository.

To enable downloads, place a general, approved public PDF at `public/resume/kai-takeuchi.pdf`, then set `profile.resumePath` to `/resume/kai-takeuchi.pdf`. The shared component replaces “PDF coming soon” with “Download Resume” and respects the base path. Update the résumé page description and “In the meantime” copy when the PDF is ready.

## GitHub Pages publishing — later step

No remote or deployment is created by this foundation. Once ready to publish:

1. Create or select the intended GitHub repository. Review all visible content and assets before pushing.
2. Push this project to its `main` branch. Keep the lockfile tracked.
3. In repository **Settings → Pages**, choose **GitHub Actions** as the build source.
4. Run **Validate and deploy portfolio** from Actions (or push a later change to `main`). Pull requests run validation only.

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

### Later custom domain: kaitakeuchi.com

The domain is intentionally inactive in this project: no `CNAME`, active domain URL, or DNS change is included.

When the domain is ready, verify ownership and configure it in the repository’s Pages settings, then add the DNS records required by GitHub’s current documentation. Configure the apex domain and any desired `www` redirect, wait for DNS/certificate provisioning, and enable HTTPS. The Pages action will then provide the custom origin and an empty base path on the next deployment. Rebuild and check canonical URLs, all assets, nested pages, and the 404 link before sharing.

For custom Actions deployments, GitHub’s Pages setting is authoritative; a source `CNAME` is not needed for this workflow. Consult the official instructions rather than reusing potentially stale DNS addresses:

- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind’s Astro integration](https://tailwindcss.com/docs/installation/framework-guides/astro)

## Intentional first-pass gaps

See `docs/content-status.md` for deferred narratives, personal reflections, résumé, and future publication checks. See `docs/verification.md` for actual verification evidence and limits. Screenshots of the portfolio are kept in the ignored `artifacts/` directory when generated during review.
