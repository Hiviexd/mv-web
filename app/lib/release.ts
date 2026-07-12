import releaseData from "../data/release.json";

export interface ReleaseDownloads {
    windows: string | null;
    linux: string | null;
    macos: string | null;
}

export interface ReleaseVersionEntry {
    version: string;
    downloadCount: number;
    downloads: ReleaseDownloads;
}

export interface ReleaseChannel {
    latestVersion: string;
    isLatest: boolean;
    downloadCount: number;
    downloads: ReleaseDownloads;
    versions: ReleaseVersionEntry[];
}

export interface ReleaseData {
    release: ReleaseChannel;
    beta: ReleaseChannel;
}

export interface PlatformDownload {
    key: keyof ReleaseDownloads;
    name: string;
    url: string;
}

export const releases: ReleaseData = releaseData as ReleaseData;

const PLATFORM_ENTRIES: { key: keyof ReleaseDownloads; name: string }[] = [
    { key: "windows", name: "Windows" },
    { key: "macos", name: "macOS" },
    { key: "linux", name: "Linux" },
];

export function buildPlatforms(downloads: ReleaseDownloads): PlatformDownload[] {
    return PLATFORM_ENTRIES.map(({ key, name }) => {
        const url = downloads[key];
        return url ? { key, name, url } : null;
    }).filter((platform): platform is PlatformDownload => platform !== null);
}

export function getDownloadUrl(
    channel: ReleaseChannel,
    platform: keyof ReleaseDownloads
): string | null {
    return channel.downloads[platform];
}

export function formatDownloadCount(count: number): string {
    return new Intl.NumberFormat().format(count);
}
