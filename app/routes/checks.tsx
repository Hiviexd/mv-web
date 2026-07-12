import type { Route } from "./+types/checks";
import { CheckIndexList } from "../components/checks/CheckIndexList";
import { CheckIndexSkeleton } from "../components/checks/CheckIndexSkeleton";
import { categoryGroups } from "../lib/checks";
import { createPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
    return createPageMeta({
        title: "Checks | Mapset Verifier",
        ogTitle: "Checks",
        description: "Documentation for every automated check in Mapset Verifier.",
        path: "/checks",
    });
}

export function HydrateFallback() {
    return <CheckIndexSkeleton />;
}

export default function ChecksIndex() {
    return <CheckIndexList groups={categoryGroups} />;
}
