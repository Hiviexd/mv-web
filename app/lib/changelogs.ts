import { rcompare, valid } from "semver";

const changelogModules = import.meta.glob("../data/changelogs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export interface ChangelogEntry {
    version: string;
    title: string;
    preview: string;
    body: string;
}

const HEADING_PATTERN = /^(#{1,6})\s+(.+)$/;

function versionFromPath(path: string): string {
    const match = path.match(/\/([^/]+)\.md$/);
    return match?.[1] ?? path;
}

function parseChangelog(version: string, raw: string): ChangelogEntry {
    const lines = raw.split(/\r?\n/);
    let title = version;
    let titleLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(HEADING_PATTERN);
        if (match) {
            title = match[2].trim();
            titleLineIndex = i;
            break;
        }
    }

    let preview = "";
    if (titleLineIndex >= 0) {
        for (let i = titleLineIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                preview = line;
                break;
            }
        }
    }

    const body =
        titleLineIndex >= 0
            ? [...lines.slice(0, titleLineIndex), ...lines.slice(titleLineIndex + 1)].join("\n").trim()
            : raw.trim();

    return { version, title, preview, body };
}

function compareVersions(a: string, b: string): number {
    const aValid = valid(a);
    const bValid = valid(b);
    if (aValid && bValid) {
        return rcompare(aValid, bValid);
    }
    return b.localeCompare(a);
}

const sortedChangelogs: ChangelogEntry[] = Object.entries(changelogModules)
    .map(([path, raw]) => parseChangelog(versionFromPath(path), raw))
    .sort((a, b) => compareVersions(a.version, b.version));

export const latestChangelogVersion = sortedChangelogs[0]?.version ?? null;

export function getChangelogs(): ChangelogEntry[] {
    return sortedChangelogs;
}
