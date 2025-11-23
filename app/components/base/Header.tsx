import { AppShell, Group, Badge, Burger, Box } from "@mantine/core";
import { Logo } from "./Logo";
import { NavigationLinks } from "../header/NavigationLinks";
import { ActionIcons } from "../header/ActionIcons";
import metadata from "../../data/metadata.json";

interface IProps {
    mobileHeaderOpened: boolean;
    toggleMobileHeader: () => void;
}

export function Header({ mobileHeaderOpened, toggleMobileHeader }: IProps) {
    return (
        <AppShell.Header className="header-base">
            <Group justify="space-between" h="100%" px="xl" className="header-container">
                <Group gap="xl">
                    <Group gap="xs">
                        <Logo width={32} height={32} />
                        <Badge color="primary.2" variant="light">
                            v{metadata.latestVersion}
                        </Badge>
                    </Group>
                    <Box visibleFrom="md">    
                        <NavigationLinks />
                    </Box>
                </Group>
                <Box visibleFrom="md">
                    <ActionIcons />
                </Box>
                {/* Mobile */}
                <Group hiddenFrom="md">
                    <Burger opened={mobileHeaderOpened} onClick={toggleMobileHeader} size="sm" />
                </Group>
            </Group>
        </AppShell.Header>
    );
}
