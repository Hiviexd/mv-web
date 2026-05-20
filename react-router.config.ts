import type { Config } from "@react-router/dev/config";
import checksMetadata from "./app/data/checks-metadata.json";

const slugify = (value: string) =>
    value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

const checkPaths = checksMetadata.checks.map((check) => `/checks/${slugify(check.name)}`);

export default {
    async prerender({ getStaticPaths }) {
        return [...getStaticPaths(), "/checks", ...checkPaths];
    },
} satisfies Config;
