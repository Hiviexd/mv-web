import type { ReactNode } from "react";
import { Outlet, useLocation, useNavigation } from "react-router";
import { Layout } from "../components/base/Layout";
import { ChecksLayoutSkeleton } from "../components/checks/CheckIndexSkeleton";
import { HomeSkeleton } from "../components/home/HomeSkeleton";
import { ReleasesSkeleton } from "../components/releases/ReleasesSkeleton";

function getNavigationSkeleton(pathname: string): ReactNode | null {
    if (pathname.startsWith("/checks")) {
        return <ChecksLayoutSkeleton />;
    }

    if (pathname.startsWith("/releases")) {
        return <ReleasesSkeleton />;
    }

    if (pathname === "/") {
        return <HomeSkeleton />;
    }

    return null;
}

function isEnteringRoute(currentPath: string, nextPath: string) {
    if (nextPath.startsWith("/checks")) {
        return !currentPath.startsWith("/checks");
    }

    if (nextPath.startsWith("/releases")) {
        return !currentPath.startsWith("/releases");
    }

    if (nextPath === "/") {
        return currentPath !== "/";
    }

    return false;
}

export default function SiteLayout() {
    const location = useLocation();
    const navigation = useNavigation();
    const nextPath = navigation.location?.pathname;
    const isLoadingRoute =
        navigation.state === "loading" && nextPath && isEnteringRoute(location.pathname, nextPath);
    const navigationSkeleton = nextPath ? getNavigationSkeleton(nextPath) : null;

    return <Layout>{isLoadingRoute && navigationSkeleton ? navigationSkeleton : <Outlet />}</Layout>;
}
