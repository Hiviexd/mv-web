import { AppShell, Group, Badge } from "@mantine/core";
import { Logo } from "./Logo";
import { NavigationLinks } from "../header/NavigationLinks";
import { ActionIcons } from "../header/ActionIcons";
import metadata from "../../data/metadata.json";

export function Header() {
    return (
        <AppShell.Header>
            <Group justify="space-between" h="100%" px="xl" className="header-container">
                <Group gap="xl">
                    <Group gap="xs">
                        <Logo width={32} height={32} />
                        <Badge color="primary.2" variant="light">
                            v{metadata.latestVersion}
                        </Badge>
                    </Group>
                    <NavigationLinks />
                </Group>
                <ActionIcons />
            </Group>
        </AppShell.Header>
    );
}
