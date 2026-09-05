import {
    Anchor,
    Badge,
    Box,
    Button,
    Card,
    Collapse,
    Divider,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Text,
    Title,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconDownload } from "@tabler/icons-react";
import { Logo } from "../base/Logo";
import {
    buildPlatforms,
    formatDownloadCount,
    isDisplayedReleaseVersion,
    type ReleaseChannel,
} from "../../lib/release";

const OLDER_VERSIONS_SCROLL_HEIGHT = 180;

interface ReleaseChannelCardProps {
    label: string;
    channel: ReleaseChannel;
}

function DownloadCount({ count }: { count: number }) {
    return (
        <Text size="sm" c="dimmed">
            {formatDownloadCount(count)} downloads
        </Text>
    );
}

function PlatformLinks({ downloads }: { downloads: ReleaseChannel["downloads"] }) {
    const platforms = buildPlatforms(downloads);
    if (platforms.length === 0) {
        return (
            <Text size="sm" c="dimmed">
                No downloads
            </Text>
        );
    }

    return (
        <Group gap="xs" wrap="wrap" className="platform-links">
            {platforms.map((platform, index) => (
                <Group key={platform.key} gap="xs">
                    <Anchor
                        href={platform.url}
                        size="sm"
                        c="dimmed"
                        className="platform-link"
                        style={{ textDecoration: "none" }}>
                        {platform.name}
                    </Anchor>
                    {index < platforms.length - 1 && (
                        <Text size="sm" c="dimmed" style={{ userSelect: "none" }}>
                            •
                        </Text>
                    )}
                </Group>
            ))}
        </Group>
    );
}

export function ReleaseChannelCard({ label, channel }: ReleaseChannelCardProps) {
    const platforms = buildPlatforms(channel.downloads);
    const primary = platforms[0];
    const isBeta = label === "Beta";
    const olderVersions = (channel.versions ?? []).filter((entry) =>
        isDisplayedReleaseVersion(entry.version)
    );
    const showLegacyWarning = !isBeta;
    const showOlderSection = olderVersions.length > 0 || showLegacyWarning;
    const [olderOpened, { toggle: toggleOlder }] = useDisclosure(false);

    return (
        <Card shadow="sm" padding="xl" radius="md" withBorder className="release-channel-card">
            <Stack gap="md">
                <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                    <Stack gap={4}>
                        <Group gap="xs" wrap="wrap">
                            <Badge size="lg" variant="light" color={isBeta ? "yellow" : "blue"}>
                                {label}
                            </Badge>
                            {channel.isLatest && (
                                <Badge size="lg" variant="filled" color="teal">
                                    Latest
                                </Badge>
                            )}
                        </Group>
                        <Title order={2}>v{channel.latestVersion}</Title>
                        <DownloadCount count={channel.downloadCount} />
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
                    <Group gap="xs" justify="center" className="platform-links">
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

                {showOlderSection && (
                    <Stack gap="xs" className="release-channel-card__older">
                        <UnstyledButton
                            type="button"
                            onClick={toggleOlder}
                            w="100%"
                            aria-expanded={olderOpened}
                            className="release-channel-card__older-trigger">
                            <Group justify="space-between" wrap="nowrap" gap="sm">
                                <Text size="sm" c="dimmed">
                                    Older versions
                                    {olderVersions.length > 0 ? ` (${olderVersions.length})` : ""}
                                </Text>
                                <IconChevronDown
                                    size={16}
                                    className="release-channel-card__older-chevron"
                                    data-opened={olderOpened || undefined}
                                />
                            </Group>
                        </UnstyledButton>

                        <Collapse in={olderOpened}>
                            <Box
                                h={OLDER_VERSIONS_SCROLL_HEIGHT}
                                className="release-channel-card__older-scroll">
                                {olderVersions.length > 0 && (
                                    <ScrollArea
                                        type="always"
                                        scrollbarSize={6}
                                        offsetScrollbars
                                        overscrollBehavior="contain">
                                        <Stack gap="xs" pr="xs">
                                            {olderVersions.map((entry) => (
                                                <Group
                                                    key={entry.version}
                                                    justify="space-between"
                                                    align="center"
                                                    wrap="nowrap"
                                                    gap="sm"
                                                    className="release-channel-card__older-row">
                                                    <Stack gap={2}>
                                                        <Text size="sm" fw={600}>
                                                            v{entry.version}
                                                        </Text>
                                                        <DownloadCount count={entry.downloadCount} />
                                                    </Stack>
                                                    <PlatformLinks downloads={entry.downloads} />
                                                </Group>
                                            ))}
                                        </Stack>
                                    </ScrollArea>
                                )}

                                {showLegacyWarning && (
                                    <Stack gap={6} className="release-channel-card__older-legacy-note">
                                        <Divider />
                                        <Text size="sm" c="dimmed" ta="center">
                                            v1 releases no longer work as they auto-update to v2
                                        </Text>
                                    </Stack>
                                )}
                            </Box>
                        </Collapse>
                    </Stack>
                )}
            </Stack>
        </Card>
    );
}
