import { NavLink, Stack } from "@mantine/core";
import { Link } from "react-router";
import { navigationLinks } from "../../config/navigation";

export function MobileNavigationLinks() {
    return (
        <Stack>
            {navigationLinks.map((link) => (
                <NavLink
                    key={link.href}
                    label={link.label}
                    component={Link}
                    to={link.href}
                    leftSection={link.icon}
                />
            ))}
        </Stack>
    );
}