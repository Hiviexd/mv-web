import type { Route } from "./+types/releases";
import { createPageMeta } from "../lib/seo";
import { ReleasesPage } from "../components/releases/ReleasesPage";
import { ReleasesSkeleton } from "../components/releases/ReleasesSkeleton";

export function meta({}: Route.MetaArgs) {
    return createPageMeta({
        title: "Releases | Mapset Verifier",
        ogTitle: "Releases",
        description: "Download Mapset Verifier stable and beta builds, and browse release changelogs.",
        path: "/releases",
    });
}

export function HydrateFallback() {
    return <ReleasesSkeleton />;
}

export default function Releases() {
    return <ReleasesPage />;
}
