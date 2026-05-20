import { Outlet, useLocation, useParams } from "react-router";
import { CheckLayout } from "../components/checks/CheckLayout";
import { categoryGroups } from "../lib/checks";

export default function ChecksLayoutRoute() {
    const { checkSlug } = useParams();
    const location = useLocation();
    const isIndex = location.pathname === "/checks";

    return (
        <CheckLayout groups={categoryGroups} activeSlug={checkSlug} title={isIndex ? "Checks documentation" : undefined}>
            <Outlet />
        </CheckLayout>
    );
}
