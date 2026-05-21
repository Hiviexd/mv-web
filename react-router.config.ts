import type { Config } from "@react-router/dev/config";
import checksMetadata from "./app/data/checks-metadata.json";
import { getCheckPath } from "./app/lib/checks";
import { slugify } from "./app/lib/utils";
import { getBasePath } from "./config/base-path";

const checkPaths = checksMetadata.checks.map((check) => getCheckPath(slugify(check.name)));

export default {
    basename: getBasePath(),
    ssr: false,
    async prerender({ getStaticPaths }) {
        return [...getStaticPaths(), "/checks", "/releases", ...checkPaths];
    },
} satisfies Config;
