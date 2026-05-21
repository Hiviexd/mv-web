import { copyFileSync, cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const clientDir = join(process.cwd(), "build", "client");

function getBasePathSegment() {
    const raw = process.env.BASE_PATH?.trim();
    if (!raw || raw === "/") {
        return null;
    }

    return raw.replace(/^\/+|\/+$/g, "");
}

/** React Router writes prerendered HTML under build/client/<segment>/; GH Pages needs them at the artifact root. */
function flattenPrerenderedRoutes() {
    const segment = getBasePathSegment();
    if (!segment) {
        return;
    }

    const nestedDir = join(clientDir, segment);
    if (!existsSync(nestedDir)) {
        return;
    }

    for (const name of readdirSync(nestedDir)) {
        const source = join(nestedDir, name);
        const target = join(clientDir, name);
        cpSync(source, target, { recursive: true, force: true });
    }

    rmSync(nestedDir, { recursive: true, force: true });
    console.log(`prepare-github-pages: flattened prerendered routes from /${segment}/`);
}

function writeSpaNotFoundPage() {
    const spaFallback = join(clientDir, "__spa-fallback.html");
    const indexHtml = join(clientDir, "index.html");
    const notFoundHtml = join(clientDir, "404.html");

    const source = existsSync(spaFallback) ? spaFallback : indexHtml;

    if (!existsSync(source)) {
        console.error("prepare-github-pages: no index or SPA fallback found. Run pnpm run build first.");
        process.exit(1);
    }

    copyFileSync(source, notFoundHtml);
    console.log(
        `prepare-github-pages: wrote 404.html from ${existsSync(spaFallback) ? "__spa-fallback.html" : "index.html"}`
    );
}

if (!existsSync(clientDir)) {
    console.error("prepare-github-pages: build/client not found. Run pnpm run build first.");
    process.exit(1);
}

flattenPrerenderedRoutes();
writeSpaNotFoundPage();
writeFileSync(join(clientDir, ".nojekyll"), "");
