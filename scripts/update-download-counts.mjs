#!/usr/bin/env node
/**
 * Patch downloadCount fields in app/data/release.json from GitHub release assets.
 * Leaves versions, URLs, and channel metadata unchanged.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
    fetchReleases,
    findReleaseByTag,
    parseRepo,
    pickDownloads,
} from "./lib/github-releases.mjs";

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT ?? process.cwd();
const releasePath = join(WORKSPACE_ROOT, "app/data/release.json");
const metadata = JSON.parse(readFileSync(join(WORKSPACE_ROOT, "app/data/metadata.json"), "utf8"));
const { owner, repo } = parseRepo(metadata.repository);
const releases = await fetchReleases(owner, repo);
const data = JSON.parse(readFileSync(releasePath, "utf8"));

let updated = 0;
let missing = 0;

function applyDownloadCount(entry, versionLabel) {
    const release = findReleaseByTag(releases, versionLabel);
    if (!release) {
        console.warn(`No GitHub release for ${versionLabel}; leaving downloadCount=${entry.downloadCount}`);
        missing += 1;
        return;
    }
    const { downloadCount } = pickDownloads(release.assets ?? []);
    if (entry.downloadCount === downloadCount) return;
    console.log(`${versionLabel}: ${entry.downloadCount} -> ${downloadCount}`);
    entry.downloadCount = downloadCount;
    updated += 1;
}

for (const channel of [data.release, data.beta]) {
    if (!channel) continue;
    applyDownloadCount(channel, channel.latestVersion);
    for (const version of channel.versions ?? []) {
        applyDownloadCount(version, version.version);
    }
}

if (updated === 0) {
    console.log(`No download count changes (${missing} unmatched release(s))`);
    process.exit(0);
}

writeFileSync(releasePath, JSON.stringify(data, null, 4) + "\n");
console.log(`Updated ${updated} download count(s); ${missing} unmatched`);
