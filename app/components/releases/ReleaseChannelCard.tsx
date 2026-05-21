import { Anchor, Badge, Box, Button, Card, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Logo } from "../base/Logo";
import { buildPlatforms, type ReleaseChannel } from "../../lib/release";

interface ReleaseChannelCardProps {
    label: string;
    channel: ReleaseChannel;
}

export function ReleaseChannelCard({ label, channel }: ReleaseChannelCardProps) {
    const platforms = buildPlatforms(channel.downloads);
    const primary = platforms[0];
    const isBeta = label === "Beta";

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder className="release-channel-card" h="100%">
            <Stack gap="md" h="100%">
                <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                    <Stack gap={4}>
                        <Badge size="lg" variant="light" color={isBeta ? "yellow" : "blue"}>
                            {label}
                        </Badge>
                        <Title order={2}>v{channel.latestVersion}</Title>
                    </Stack>
                    <Box
                        className={`release-channel-card__logo${isBeta ? " release-channel-card__logo--beta" : ""}`}
                        aria-hidden>
                        <Paper radius="lg" p="xs" className="release-channel-card__logo-paper">
                            <Logo width={36} height={36} />
                        </Paper>
                    </Box>
                </Group>

                {primary ? (
                    <Button
                        component="a"
                        href={primary.url}
                        leftSection={<IconDownload size={18} />}
                        size="lg"
                        color={isBeta ? "yellow" : "blue"}
                        variant={isBeta ? "light" : "filled"}
                        fullWidth>
                        Download for {primary.name}
                    </Button>
                ) : (
                    <Text size="sm" c="dimmed">
                        No downloads available for this channel.
                    </Text>
                )}

                {platforms.length > 1 && (
                    <Group gap="xs" justify="center" className="platform-links" mt="auto">
                        {platforms.slice(1).map((platform, index) => (
                            <Group key={platform.key} gap="xs">
                                <Anchor
                                    href={platform.url}
                                    size="sm"
                                    c="dimmed"
                                    className="platform-link"
                                    style={{ textDecoration: "none" }}>
                                    {platform.name}
                                </Anchor>
                                {index < platforms.length - 2 && (
                                    <Text size="sm" c="dimmed" style={{ userSelect: "none" }}>
                                        •
                                    </Text>
                                )}
                            </Group>
                        ))}
                    </Group>
                )}
            </Stack>
        </Card>
    );
}
