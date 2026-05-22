import type { Route } from "./+types/checks";
import { CheckIndexList } from "../components/checks/CheckIndexList";
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

export default function ChecksIndex() {
    return <CheckIndexList groups={categoryGroups} />;
}
