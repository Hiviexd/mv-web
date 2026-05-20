import type { Route } from "./+types/checks";
import { CheckIndexList } from "../components/checks/CheckIndexList";
import { categoryGroups } from "../lib/checks";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Checks - Mapset Verifier" },
        {
            name: "description",
            content: "Documentation for every automated check in Mapset Verifier.",
        },
    ];
}

export default function ChecksIndex() {
    return <CheckIndexList groups={categoryGroups} />;
}
