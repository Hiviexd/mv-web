/** Base path for GitHub Pages project sites (e.g. `/mv-web/`). Use `/` for a custom domain. */
export function getBasePath(): string {
    const raw = process.env.BASE_PATH?.trim();
    if (!raw || raw === "/") {
        return "/";
    }

    const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
    return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}
