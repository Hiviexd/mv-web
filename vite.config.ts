import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getBasePath } from "./config/base-path";

export default defineConfig({
    base: getBasePath(),
    plugins: [reactRouter(), tsconfigPaths()],
});
