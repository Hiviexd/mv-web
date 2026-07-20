# mv-web

Website for the [Mapset Verifier](https://github.com/Naxesss/MapsetVerifier) project.

## Development

```bash
pnpm install
pnpm dev
```

## GitHub Pages

The site builds as a static SPA (`ssr: false`) with prerendered routes. Pushes to `main` deploy via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

In the repo **Settings → Pages**, set **Source** to **GitHub Actions** and configure custom domain.

### Local preview

```powershell
pnpm run build:pages
npx serve build/client
```

To preview the legacy `github.io/<repo>/` project URL locally, set `BASE_PATH=/mv-web/` before building.

## Syncing content

Check docs, assets, changelogs, and release download links are pulled from the [MapsetVerifier](https://github.com/Naxesss/MapsetVerifier) repository. Run the **Sync MapsetVerifier content** workflow ([`.github/workflows/sync-content.yml`](.github/workflows/sync-content.yml)) from the Actions tab; it always resolves the latest release tag (stable or prerelease), clones MapsetVerifier at that tag, and runs [`scripts/sync-content.mjs`](scripts/sync-content.mjs). That script exports check metadata, marks checks that exist only in a prerelease (not in the latest stable) as beta, mirrors assets and changelog images, copies changelog markdown (rewriting image paths for the site), and refreshes `app/data/release.json` from GitHub releases. Changes are committed to `sync/content-update` and opened or updated as a pull request against `main`.
