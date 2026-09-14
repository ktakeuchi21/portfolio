# Portfolio deployment

- Source: [ktakeuchi21/portfolio](https://github.com/ktakeuchi21/portfolio), public repository.
- Publishing branch: `main`.
- Hosting: GitHub Pages, using the **Validate and deploy portfolio** Actions workflow.
- Primary domain: `kaitakeuchi.com`.
- Alternate address: `www.kaitakeuchi.com`, pointing to GitHub Pages for its automatic redirect to the primary domain.
- Registrar and authoritative DNS: Cloudflare.
- Domain ownership: verified in the `ktakeuchi21` GitHub account.

## DNS configuration

| Type | Name | Value | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `ktakeuchi21.github.io` | DNS only |
| TXT | `_github-pages-challenge-ktakeuchi21` | GitHub's verification value, retained in Cloudflare | DNS only |

The website records have a five-minute TTL. Keep the verification TXT record to preserve GitHub's domain ownership protection. No email hosting or email-routing records were configured.

## Verification status

The first GitHub Actions deployment succeeded. Cloudflare lists all five website DNS records and the existing verification TXT record. The authoritative DNS server returns the expected `www` CNAME, and the apex domain returns HTTP 200 from GitHub Pages.

GitHub issued a certificate for both `kaitakeuchi.com` and `www.kaitakeuchi.com`, and HTTPS enforcement is enabled. The primary HTTPS address returns HTTP 200; the `www` HTTPS address returns a 301 redirect to `https://kaitakeuchi.com/`. Certificate validation succeeded without bypasses.

## Updating the site

Push validated changes to `main` and confirm the Actions run completes successfully. The workflow derives the site origin and base path from the repository's actual Pages settings. Local builds do not assume the production origin.

GitHub Pages manages the TLS certificate. If the domain or HTTPS setting changes, run the workflow again so generated canonical and social URLs use the current origin. With a custom Actions workflow, GitHub's Pages settings are authoritative; a source `CNAME` file is not required.

Reference: [GitHub Pages HTTPS setup](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
