import { Box, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Logo } from "../base/Logo";

export function HeroSection() {
    return (
        <Group align="center" gap="xl" mih="60vh">
            <Stack flex={1} gap="xl">
                <Group gap="md" align="center">
                    <Logo width={60} height={60} />
                    <Title order={1} size="3rem" c="primary.2">
                        Mapset Verifier
                    </Title>
                </Group>
                <Stack gap="lg">
                    <Text size="xl" c="dimmed">
                        The #1 osu! modding tool. Catch issues before they become problems.
                    </Text>
                    <Button size="lg" leftSection={<IconDownload size={20} />}>
                        Download Latest Release
                    </Button>
                </Stack>
            </Stack>

            <Card maw="50%" p="0">
                <img src="https://i.imgur.com/F6HhxPU.gif?sanitize=true" alt="Mapset Verifier" />
            </Card>
        </Group>
    );
}
