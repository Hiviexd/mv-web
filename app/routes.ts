import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/_layout.tsx", [
        index("routes/home.tsx"),
        route("releases", "routes/releases.tsx"),
        route("checks", "routes/checks-layout.tsx", [
            index("routes/checks.tsx"),
            route(":checkSlug", "routes/checks.$checkSlug.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
