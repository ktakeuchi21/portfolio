# Foundation verification

Verified locally on September 13, 2026, with Node 24 and npm 11.

## Build and content

- A clean `npm ci` completed successfully; npm reported zero dependency vulnerabilities at install time.
- `npm run check` passed for 26 Astro files with zero errors, warnings, or hints.
- The production build generated seven pages: Home, Work, Projects, About, Resume, Pathway, and 404.
- `npm run verify:build` checked all seven pages and 95 local link and asset targets. Page metadata, headings, image descriptions and dimensions, font paths, draft exclusion, and the résumé placeholder passed.
- Production builds and the output verifier passed both with root hosting and with the test repository base path `/portfolio-test/`, using `https://ktakeuchi21.github.io` as the test origin.
- A browser review of the subpath production preview confirmed navigation from Home to Projects to Pathway, loaded project imagery and both font families, the correct stylesheet URL, and the expected Pathway canonical URL. The generated Pathway page contained zero script elements.
- `npm run verify:content` temporarily added one published personal-project MDX entry and one published professional-work MDX entry. Both generated listing cards and detail pages without a custom route. Verification passed for nine pages and 120 targets. The script removed its fixtures and rebuilt the original seven-page site successfully.

## Browser and accessibility review

- All seven routes were inspected for DOM layout at 390 × 844, 768 × 1024, and 1440 × 1000. None had horizontal page overflow, out-of-bounds text, missing image alt text, or an incorrect number of primary headings.
- Visual inspection covered desktop and mobile Home and Projects, tablet Home, and the Pathway case study on desktop and mobile. About, Work, Resume, and the 404 page were also reviewed in the browser.
- Navigation clicks were exercised, including the 404 return-home action and the Pathway detail link.
- Keyboard Tab reached the visible skip link with a two-pixel accent outline. Enter moved focus to the main content. Navigation has visible focus styles, and principal controls have at least 44-pixel touch targets.
- Text contrast was calculated against the defined color tokens: primary text 12.47:1, muted text 5.54:1, accent text 7.33:1, and white button text 7.72:1. Muted text on the pale panel background is 5.06:1.
- The Resume page displayed “PDF coming soon” with no download link or embedded document. Profile links remained available.
- Representative viewport captures are stored locally in ignored `artifacts/home-desktop.png`, `artifacts/home-tablet.png`, `artifacts/home-mobile.png`, and `artifacts/projects-desktop.png`. The 21 route/viewport geometry results are in `artifacts/browser-checks.json`.

## Content and external destinations

- Visible source copy was reviewed for the agreed employer boundaries. Syneos is described as early strategy and prototyping. Unverified résumé-only metrics and patent-grant claims are omitted.
- The application PDFs were not copied into the repository. No résumé PDF, phone number, internal employer product name, confidential case data, or invented outcome is published.
- The three personal projects are labeled as personal projects and as synthetic or fictional demonstrations where applicable.
- The public Patient Access demo, Pathway frontend, and What I Made public sample returned HTTP 200. Public repository documentation supplied project descriptions and current destinations. The Patient Access repository was unavailable through the unauthenticated API, so its GitHub action is omitted.
- Image provenance, third-party attribution, and font licenses are retained. See `sources.md` and `../public/credits.txt`.

## Limits and deferred work

GitHub Actions was configured and reviewed, but not run remotely. No remote repository, push, Pages publication, or DNS change was made. The local root and subpath builds validate generated paths; they do not prove a future GitHub account's Pages permissions or domain settings.

Browser and contrast checks are targeted manual checks, not a comprehensive assistive-technology certification. External demonstrations were checked as destinations; this review did not send messages, run paid model calls, or validate their backend behavior.

The public résumé, full employer narratives, and firsthand personal-project reflections remain intentional content gaps. See `content-status.md`.
