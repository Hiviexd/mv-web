export function parseRepo(repositoryUrl) {
    const match = repositoryUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/i);
    if (!match) {
        throw new Error(`Cannot parse GitHub repository from: ${repositoryUrl}`);
    }
    return { owner: match[1], repo: match[2] };
}

export function stripTag(tag) {
    return tag.replace(/^v/i, "");
}

export function pickDownloads(assets) {
    const downloads = { windows: null, linux: null, macos: null };
    const picked = [];

    const appImage = assets.find((a) => a.name.toLowerCase().endsWith(".appimage"));
    const tarGz = assets.find((a) => a.name.toLowerCase().endsWith(".tar.gz"));
    const linuxAsset = appImage ?? tarGz;
    if (linuxAsset) {
        downloads.linux = linuxAsset.browser_download_url;
        picked.push(linuxAsset);
    }

    for (const asset of assets) {
        const name = asset.name;
        const lower = name.toLowerCase();
        const url = asset.browser_download_url;

        if (lower.endsWith(".blockmap")) continue;

        if (lower.endsWith(".exe") && !downloads.windows) {
            downloads.windows = url;
            picked.push(asset);
        }

        if (lower.endsWith(".dmg") && !lower.includes("arm64") && !downloads.macos) {
            downloads.macos = url;
            picked.push(asset);
        }
    }

    const downloadCount = picked.reduce((sum, asset) => sum + (asset.download_count ?? 0), 0);
    return { downloads, downloadCount };
}

export function findReleaseByTag(releases, tag) {
    if (!tag) return null;
    const normalized = stripTag(tag);
    return (
        releases.find((release) => release.tag_name === tag) ??
        releases.find((release) => stripTag(release.tag_name) === normalized) ??
        null
    );
}

function nextLink(linkHeader) {
    if (!linkHeader) return null;
    const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
    return match?.[1] ?? null;
}

export async function fetchReleases(owner, repo) {
    const headers = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const releases = [];
    let url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`;
    while (url) {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
        }
        releases.push(...(await response.json()));
        url = nextLink(response.headers.get("link"));
    }
    return releases;
}
