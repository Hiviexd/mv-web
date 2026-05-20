import { AppShell, Group, Badge, Burger, Box, Anchor } from "@mantine/core";
import { Link } from "react-router";
import { Logo } from "./Logo";
import { NavigationLinks } from "../header/NavigationLinks";
import { ActionIcons } from "../header/ActionIcons";
import { releases } from "../../lib/release";

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
                        <Anchor component={Link} to="/" underline="never" aria-label="Mapset Verifier home">
                            <Logo width={32} height={32} />
                        </Anchor>
                        <Badge color="primary.2" variant="light">
                            v{releases.release.latestVersion}
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
