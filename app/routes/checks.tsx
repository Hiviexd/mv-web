import type { Route } from "./+types/checks";
import { Layout } from "../components/base/Layout";
import { CheckLayout } from "../components/checks/CheckLayout";
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
    return (
        <Layout>
            <CheckLayout groups={categoryGroups} title="Checks documentation">
                <CheckIndexList groups={categoryGroups} />
            </CheckLayout>
        </Layout>
    );
}
