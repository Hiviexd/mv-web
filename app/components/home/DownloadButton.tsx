import { UnstyledButton, Stack, Text, Group, Anchor } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import metadata from "../../data/metadata.json";

interface Platform {
    key: string;
    name: string;
    url: string;
}

const allPlatforms: Platform[] = [
    { key: "windows", name: "Windows", url: metadata.downloads.windows },
    { key: "macos", name: "macOS", url: metadata.downloads.macos },
    { key: "linux", name: "Linux", url: metadata.downloads.linux },
];

export default function DownloadButton() {
    const os = useOs();

    // Map OS to display name and download link
    const getPlatformInfo = () => {
        switch (os) {
            case "windows":
                return { name: "Windows", url: metadata.downloads.windows };
            case "macos":
                return { name: "macOS", url: metadata.downloads.macos };
            case "linux":
                return { name: "Linux", url: metadata.downloads.linux };
            default:
                return { name: "Windows", url: metadata.downloads.windows };
        }
    };

    const platformInfo = getPlatformInfo();

    // Get other platforms (excluding current one)
    const otherPlatforms = allPlatforms.filter((platform) => {
        const currentKey =
            os === "windows" ? "windows" : os === "macos" ? "macos" : os === "linux" ? "linux" : "windows";
        return platform.key !== currentKey;
    });

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
