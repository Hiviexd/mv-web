import { Group, Button } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { navigationLinks } from "../../config/navigation";

export function NavigationLinks() {
    const activePath = useLocation().pathname.split("/")[1];
    return (
        <Group gap="md">
            {navigationLinks.map((link) => (
                <Button
                    variant={activePath === link.href.split("/")[1] ? "light" : "subtle"}
                    color="primary.2"
                    component={Link}
                    key={link.href}
                    to={link.href}
                    leftSection={link.icon}>
                    {link.label}
                </Button>
            ))}
        </Group>
    );
}
