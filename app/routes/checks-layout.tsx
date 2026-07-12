import { Outlet, useLocation, useNavigation, useParams } from "react-router";
import { CheckLayout } from "../components/checks/CheckLayout";
import { CheckIndexSkeleton, ChecksLayoutSkeleton } from "../components/checks/CheckIndexSkeleton";
import { categoryGroups } from "../lib/checks";

export function HydrateFallback() {
    return <ChecksLayoutSkeleton />;
}

export default function ChecksLayoutRoute() {
    const { checkSlug } = useParams();
    const location = useLocation();
    const navigation = useNavigation();
    const isIndex = location.pathname === "/checks";
    const isLoadingIndex =
        navigation.state === "loading" &&
        navigation.location?.pathname === "/checks" &&
        location.pathname !== "/checks";

    return (
        <CheckLayout groups={categoryGroups} activeSlug={checkSlug} title={isIndex ? "Checks documentation" : undefined}>
            {isLoadingIndex ? <CheckIndexSkeleton /> : <Outlet />}
        </CheckLayout>
    );
}
