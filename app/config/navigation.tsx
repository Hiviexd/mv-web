import { IconChecks, IconDownload, IconHome, type Icon } from "@tabler/icons-react";

export interface NavigationLink {
    label: string;
    href: string;
    icon: Icon;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Home", href: "/", icon: IconHome },
    { label: "Downloads", href: "/releases", icon: IconDownload },
    { label: "Checks", href: "/checks", icon: IconChecks },
];

export const NAV_INDICATOR_TRANSITION_MS = 220;
export const NAV_ICON_SIZE = 20;
export const NAV_BORDER_RADIUS = "var(--mantine-radius-default)";

export function getActiveNavRoute(pathname: string): string | null {
    return (
        navigationLinks.find((item) =>
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
        )?.href ?? null
    );
}
