import { AppShell, Stack, Transition } from "@mantine/core";
import { MobileNavigationLinks } from "../header/MobileNavigationLinks";
import { RepositoryActions } from "../header/RepositoryActions";
import { SearchButton } from "../header/SearchButton";

interface IProps {
    opened: boolean;
    onClose: () => void;
}

export default function MobileNavbar({ opened, onClose }: IProps) {
    return (
        <Transition mounted={opened} transition="slide-left" duration={200}>
            {(styles) => (
                <AppShell.Navbar py="md" px="md" hiddenFrom="md" style={styles}>
                    <AppShell.Section grow>
                        <Stack gap="md">
                            <SearchButton isMobile onOpen={onClose} text="Search checks..." />
                            <MobileNavigationLinks onNavigate={onClose} />
                        </Stack>
                    </AppShell.Section>
                    <AppShell.Section>
                        <RepositoryActions isMobile onNavigate={onClose} />
                    </AppShell.Section>
                </AppShell.Navbar>
            )}
        </Transition>
    );
}
