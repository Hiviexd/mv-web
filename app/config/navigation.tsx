import { IconChecks, IconPackages, IconInfoCircle, IconDownload } from "@tabler/icons-react";

export interface NavigationLink {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Checks", href: "/checks", icon: <IconChecks /> },
    { label: "Downloads", href: "/releases", icon: <IconDownload /> },
    { label: "About", href: "/about", icon: <IconInfoCircle /> },
];
