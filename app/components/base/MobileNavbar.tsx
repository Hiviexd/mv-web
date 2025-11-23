import { AppShell, Stack, Transition } from "@mantine/core";
import { MobileNavigationLinks } from "../header/MobileNavigationLinks";

interface IProps {
    opened: boolean;
}

export default function MobileNavbar({ opened }: IProps) {
    return (
        <Transition mounted={opened} transition="slide-left" duration={200}>
            {(styles) => (
                <AppShell.Navbar py="md" px="md" hiddenFrom="md" style={styles}>
                    <AppShell.Section grow>
                        <Stack gap="md">
                            <MobileNavigationLinks />
                        </Stack>
                    </AppShell.Section>
                </AppShell.Navbar>
            )}
        </Transition>
    );
}
