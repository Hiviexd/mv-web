import { IconChecks, IconPackages, IconInfoCircle } from "@tabler/icons-react";

export interface NavigationLink {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Checks", href: "/checks", icon: <IconChecks /> },
    { label: "Releases", href: "/releases", icon: <IconPackages /> },
    { label: "About", href: "/about", icon: <IconInfoCircle /> },
];
