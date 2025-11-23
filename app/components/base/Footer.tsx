import { Anchor, AppShell, Group, Text } from "@mantine/core";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <AppShell.Footer>
            <Group justify="space-between">
                <Text size="sm" c="dimmed">
                    © {currentYear} Mapset Verifier. All rights reserved.
                </Text>
                <Group gap="md">
                    <Anchor size="sm" c="dimmed" href="/about">
                        About
                    </Anchor>
                    <Anchor size="sm" c="dimmed" href="/releases">
                        Releases
                    </Anchor>
                </Group>
            </Group>
        </AppShell.Footer>
    );
}
