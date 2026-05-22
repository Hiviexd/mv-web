/** URL-safe slug: splits camelCase, collapses non-alphanumerics, lowercases. */
export function slugify(value: string): string {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();
}

/** Normalize markdown from metadata (line endings, trailing space on lines). */
export function normalizeMarkdown(value?: string): string | undefined {
    if (!value) {
        return undefined;
    }

    return value
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+$/gm, "")
        .replace(/\n[ \t]+/g, "\n")
        .trim();
}
