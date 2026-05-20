import type { Route } from "./+types/releases";
import { ReleasesPage } from "../components/releases/ReleasesPage";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Releases - Mapset Verifier" },
        {
            name: "description",
            content: "Download Mapset Verifier stable and beta builds, and browse release changelogs.",
        },
    ];
}

export default function Releases() {
    return <ReleasesPage />;
}
