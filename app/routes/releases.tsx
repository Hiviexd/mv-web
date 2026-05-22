import type { Route } from "./+types/releases";
import { createPageMeta } from "../lib/seo";
import { ReleasesPage } from "../components/releases/ReleasesPage";

export function meta({}: Route.MetaArgs) {
    return createPageMeta({
        title: "Releases | Mapset Verifier",
        ogTitle: "Releases",
        description: "Download Mapset Verifier stable and beta builds, and browse release changelogs.",
        path: "/releases",
    });
}

export default function Releases() {
    return <ReleasesPage />;
}
