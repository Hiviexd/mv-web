import releaseData from "../data/release.json";

export interface ReleaseDownloads {
    windows: string | null;
    linux: string | null;
    macos: string | null;
}

export interface ReleaseChannel {
    latestVersion: string;
    downloads: ReleaseDownloads;
}

export interface ReleaseData {
    release: ReleaseChannel;
    beta: ReleaseChannel;
}

export const releases: ReleaseData = releaseData as ReleaseData;

export function getDownloadUrl(
    channel: ReleaseChannel,
    platform: keyof ReleaseDownloads
): string | null {
    return channel.downloads[platform];
}
