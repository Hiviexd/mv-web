import { Outlet, useLocation, useNavigation } from "react-router";
import { Layout } from "../components/base/Layout";
import { ChecksLayoutSkeleton } from "../components/checks/CheckIndexSkeleton";

export default function SiteLayout() {
    const location = useLocation();
    const navigation = useNavigation();
    const isEnteringChecks =
        navigation.state === "loading" &&
        navigation.location?.pathname.startsWith("/checks") &&
        !location.pathname.startsWith("/checks");

    return <Layout>{isEnteringChecks ? <ChecksLayoutSkeleton /> : <Outlet />}</Layout>;
}
