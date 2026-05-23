const mediaDimensions = {
    "/assets/home/showcase.mp4": { width: 1172, height: 700 },
    "/assets/home/snapshots.mp4": { width: 900, height: 606 },
    "/assets/home/checks.mp4": { width: 900, height: 602 },
    "/assets/home/documentation.mp4": { width: 1168, height: 606 },
    "/assets/home/overview.mp4": { width: 1642, height: 934 },
    "/assets/home/objects-overview.mp4": { width: 1060, height: 600 },
    "/assets/home/difficulty-overview.mp4": { width: 1168, height: 666 },
    "/assets/home/audio-overview.png": { width: 1644, height: 653 },
} as const;

export type MediaSrc = keyof typeof mediaDimensions;

export function getMediaAspectRatio(src: string): string | undefined {
    const dimensions = mediaDimensions[src as MediaSrc];
    if (!dimensions) return undefined;

    return `${dimensions.width} / ${dimensions.height}`;
}
