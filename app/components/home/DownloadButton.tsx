import { UnstyledButton, Stack, Text, Group, Anchor } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import { releases, type ReleaseDownloads } from "../../lib/release";

interface Platform {
    key: keyof ReleaseDownloads;
    name: string;
    url: string;
}

function buildPlatforms(downloads: ReleaseDownloads): Platform[] {
    const entries: { key: keyof ReleaseDownloads; name: string }[] = [
        { key: "windows", name: "Windows" },
        { key: "macos", name: "macOS" },
        { key: "linux", name: "Linux" },
    ];

    return entries
        .map(({ key, name }) => {
            const url = downloads[key];
            return url ? { key, name, url } : null;
        })
        .filter((platform): platform is Platform => platform !== null);
}

const allPlatforms = buildPlatforms(releases.release.downloads);

export default function DownloadButton() {
    const os = useOs();

    const getPlatformInfo = (): Platform | null => {
        const key: keyof ReleaseDownloads =
            os === "windows" ? "windows" : os === "macos" ? "macos" : os === "linux" ? "linux" : "windows";
        const url = releases.release.downloads[key];
        if (!url) {
            return allPlatforms[0] ?? null;
        }
        const name = key === "macos" ? "macOS" : key.charAt(0).toUpperCase() + key.slice(1);
        return { key, name, url };
    };

    const platformInfo = getPlatformInfo();

    if (!platformInfo) {
        return null;
    }

    const otherPlatforms = allPlatforms.filter((platform) => platform.key !== platformInfo.key);

    return (
        <Stack gap="sm" align="center" className="download-button-group" w="100%">
            <UnstyledButton
                w="100%"
                component="a"
                href={platformInfo.url}
                className="download-button"
                aria-label={`Download Latest Release for ${platformInfo.name}`}>
                <Stack gap={4} align="center" w="100%">
                    <IconDownload size={24} />
                    <Text size="lg" fw={600} ta="center" w="100%">
                        Download Latest Release
                    </Text>
                    <Text size="sm" opacity={0.8} ta="center" w="100%">
                        for {platformInfo.name}
                    </Text>
                </Stack>
            </UnstyledButton>
            {otherPlatforms.length > 0 && (
                <Group gap="xs" justify="center" className="platform-links">
                    {otherPlatforms.map((platform, index) => (
                        <Group key={platform.key} gap="xs">
                            <Anchor
                                href={platform.url}
                                size="sm"
                                c="dimmed"
                                style={{ textDecoration: "none", transition: "color 0.2s ease" }}
                                className="platform-link">
                                {platform.name}
                            </Anchor>
                            {index < otherPlatforms.length - 1 && (
                                <Text size="sm" c="dimmed" style={{ userSelect: "none" }}>
                                    •
                                </Text>
                            )}
                        </Group>
                    ))}
                </Group>
            )}
        </Stack>
    );
}
