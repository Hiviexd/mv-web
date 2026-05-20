import type { Config } from "@react-router/dev/config";
import checksMetadata from "./app/data/checks-metadata.json";
import { getCheckPath } from "./app/lib/checks";
import { slugify } from "./app/lib/utils";

const checkPaths = checksMetadata.checks.map((check) => getCheckPath(slugify(check.name)));

export default {
    async prerender({ getStaticPaths }) {
        return [...getStaticPaths(), "/checks", ...checkPaths];
    },
} satisfies Config;
