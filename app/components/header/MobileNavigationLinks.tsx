import { NavLink, Stack } from "@mantine/core";
import { navigationLinks } from "../../config/navigation";

export function MobileNavigationLinks() {
    return (
        <Stack>
            {navigationLinks.map((link) => (
                <NavLink key={link.href} label={link.label} href={link.href} leftSection={link.icon} />
            ))}
        </Stack>
    );
}