import { Group, Button } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { navigationLinks } from "../../config/navigation";

export function NavigationLinks() {
    const activePath = useLocation().pathname;
    return (
        <Group gap="md">
            {navigationLinks.map((link) => (
                <Button
                    variant={activePath === link.href ? "filled" : "subtle"}
                    color="default"
                    component={Link}
                    key={link.href}
                    to={link.href}>
                    {link.label}
                </Button>
            ))}
        </Group>
    );
}
