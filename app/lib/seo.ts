const SITE_URL = "https://mv.hivie.tn";
const SITE_NAME = "Mapset Verifier";
const THEME_COLOR = "#99ccff";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMetaOptions {
    title: string;
    ogTitle: string;
    description: string;
    path?: string;
    /** When true, omits `og:site_name` (home page). */
    isHome?: boolean;
    image?: string;
}

export function createPageMeta({
    title,
    ogTitle,
    description,
    path = "/",
    isHome = false,
    image = DEFAULT_OG_IMAGE,
}: PageMetaOptions) {
    const url = `${SITE_URL}${path}`;

    return [
        { title },
        { name: "description", content: description },
        { name: "theme-color", content: THEME_COLOR },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        ...(isHome ? [] : [{ property: "og:site_name", content: SITE_NAME }]),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
    ];
}
