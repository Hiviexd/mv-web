#!/usr/bin/env node
/**
 * Sync checks metadata, assets, changelogs, and release.json from MapsetVerifier.
 * Expects MAPSETVERIFIER_ROOT and WORKSPACE_ROOT env vars (defaults WORKSPACE_ROOT to cwd).
 */

import {
    cpSync,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT ?? process.cwd();
const MAPSETVERIFIER_ROOT = process.env.MAPSETVERIFIER_ROOT;

if (!MAPSETVERIFIER_ROOT) {
    console.error("MAPSETVERIFIER_ROOT is required");
    process.exit(1);
}

const metadataPath = join(WORKSPACE_ROOT, "app/data/metadata.json");
const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));

function sourcePath(key) {
    return join(MAPSETVERIFIER_ROOT, metadata.locations[key].replace(/^\//, ""));
}

function destPath(key) {
    return join(WORKSPACE_ROOT, metadata.destinations[key]);
}

function parseRepo(repositoryUrl) {
    const match = repositoryUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/i);
    if (!match) {
        throw new Error(`Cannot parse GitHub repository from: ${repositoryUrl}`);
    }
    return { owner: match[1], repo: match[2] };
}

function stripTag(tag) {
    return tag.replace(/^v/i, "");
}

function mirrorDir(src, dest) {
    if (!existsSync(src)) {
        console.warn(`Source missing, skipping mirror: ${src}`);
        return;
    }
    mkdirSync(dirname(dest), { recursive: true });
    try {
        execSync(`rsync -a --delete "${src.replace(/"/g, '\\"')}/" "${dest.replace(/"/g, '\\"')}/"`, {
            stdio: "inherit",
        });
    } catch {
        if (existsSync(dest)) {
            rmSync(dest, { recursive: true, force: true });
        }
        mkdirSync(dest, { recursive: true });
        cpSync(src, dest, { recursive: true });
    }
}

function rewriteMarkdownImagePaths(text) {
    if (!text) return text;
    return text
        .replaceAll("![](assets/checks/", "![](/assets/checks/")
        .replaceAll("](assets/checks/", "](/assets/checks/");
}

function rewriteChangelogMarkdown(text) {
    return text.replace(/\]\(changelog\//g, "](/changelog/");
}

function stripTrailingPeriods(text) {
    return text.replace(/\.+$/, "");
}

function rewriteChecksMetadata(filePath) {
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    for (const check of data.checks ?? []) {
        if (typeof check.message === "string") {
            check.message = stripTrailingPeriods(check.message);
        }

        const doc = check.documentation;
        if (!doc) continue;
        for (const key of Object.keys(doc)) {
            if (typeof doc[key] === "string") {
                doc[key] = rewriteMarkdownImagePaths(doc[key]);
            }
        }
    }
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function rewriteChangelogFiles(dir) {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
        if (!name.endsWith(".md")) continue;
        const filePath = join(dir, name);
        const content = readFileSync(filePath, "utf8");
        writeFileSync(filePath, rewriteChangelogMarkdown(content));
    }
}

function pickDownloadUrls(assets) {
    const downloads = { windows: null, linux: null, macos: null };

    const appImage = assets.find((a) => a.name.toLowerCase().endsWith(".appimage"));
    const tarGz = assets.find((a) => a.name.toLowerCase().endsWith(".tar.gz"));
    downloads.linux = appImage?.browser_download_url ?? tarGz?.browser_download_url ?? null;

    for (const asset of assets) {
        const name = asset.name;
        const lower = name.toLowerCase();
        const url = asset.browser_download_url;

        if (lower.endsWith(".blockmap")) continue;

        if (lower.endsWith(".exe") && !downloads.windows) {
            downloads.windows = url;
        }

        if (lower.endsWith(".dmg") && !lower.includes("arm64") && !downloads.macos) {
            downloads.macos = url;
        }
    }

    return downloads;
}

function channelFromRelease(release) {
    if (!release) return null;
    return {
        latestVersion: stripTag(release.tag_name),
        downloads: pickDownloadUrls(release.assets ?? []),
    };
}

async function fetchReleases(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`;
    const headers = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
    }
    return response.json();
}

function countFiles(dir) {
    if (!existsSync(dir)) return 0;
    let count = 0;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            count += countFiles(full);
        } else {
            count += 1;
        }
    }
    return count;
}

// --- Export checks metadata ---
const exportScript = sourcePath("checks-metadata-script");
const checksMetadataDest = destPath("checks-metadata");
mkdirSync(dirname(checksMetadataDest), { recursive: true });
console.log(`Exporting checks metadata to ${checksMetadataDest}`);
execSync(`bash "${exportScript}" "${checksMetadataDest}"`, {
    cwd: MAPSETVERIFIER_ROOT,
    stdio: "inherit",
});
rewriteChecksMetadata(checksMetadataDest);

// --- Mirror assets and changelogs ---
console.log("Mirroring check assets...");
mirrorDir(sourcePath("assets-checks"), destPath("assets-checks"));

console.log("Mirroring changelog images...");
mirrorDir(sourcePath("assets-changelog"), destPath("assets-changelog"));

console.log("Mirroring changelog markdown...");
const changelogSrc = sourcePath("changelogs");
const changelogDest = destPath("changelogs");
mkdirSync(changelogDest, { recursive: true });

if (existsSync(changelogSrc)) {
    const sourceNames = new Set(
        readdirSync(changelogSrc).filter((name) => name.endsWith(".md") && statSync(join(changelogSrc, name)).isFile())
    );

    for (const name of sourceNames) {
        cpSync(join(changelogSrc, name), join(changelogDest, name));
    }

    for (const name of readdirSync(changelogDest)) {
        if (!name.endsWith(".md")) continue;
        if (!sourceNames.has(name)) {
            rmSync(join(changelogDest, name));
        }
    }
}

rewriteChangelogFiles(changelogDest);

// --- Update release.json ---
const { owner, repo } = parseRepo(metadata.repository);
const releases = await fetchReleases(owner, repo);
const stableRelease = releases.find((r) => !r.prerelease);
const betaRelease = releases.find((r) => r.prerelease);

const releaseData = {
    release: channelFromRelease(stableRelease) ?? {
        latestVersion: "0.0.0",
        downloads: { windows: null, linux: null, macos: null },
    },
    beta: channelFromRelease(betaRelease) ?? {
        latestVersion: "0.0.0",
        downloads: { windows: null, linux: null, macos: null },
    },
};

const releasePath = join(WORKSPACE_ROOT, "app/data/release.json");
writeFileSync(releasePath, JSON.stringify(releaseData, null, 4) + "\n");
console.log(`Wrote ${releasePath}`);

const summary = {
    cloneTag: process.env.SYNC_CLONE_TAG ?? null,
    release: releaseData.release.latestVersion,
    beta: releaseData.beta.latestVersion,
    checksCount: JSON.parse(readFileSync(checksMetadataDest, "utf8")).checks?.length ?? 0,
    assetFiles: countFiles(destPath("assets-checks")),
    changelogImages: countFiles(destPath("assets-changelog")),
    changelogFiles: existsSync(changelogDest)
        ? readdirSync(changelogDest).filter((n) => n.endsWith(".md")).length
        : 0,
};

writeFileSync(join(WORKSPACE_ROOT, ".sync-summary.json"), JSON.stringify(summary, null, 2));
console.log("Sync complete:", summary);
