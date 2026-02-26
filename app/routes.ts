import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("checks", "routes/checks.tsx"),
    route("checks/:checkSlug", "routes/checks.$checkSlug.tsx"),
] satisfies RouteConfig;
