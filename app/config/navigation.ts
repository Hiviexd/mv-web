export interface NavigationLink {
    label: string;
    href: string;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Checks", href: "/checks" },
    { label: "Releases", href: "/releases" },
    { label: "About", href: "/about" },
];
