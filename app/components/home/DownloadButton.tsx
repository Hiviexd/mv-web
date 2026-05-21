import { Stack, Text, UnstyledButton } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Link } from "react-router";

export default function DownloadButton() {
    return (
        <Stack gap="sm" align="center" className="download-button-group" w="100%">
            <UnstyledButton
                w="100%"
                component={Link}
                to="/releases"
                className="download-button"
                aria-label="Go to downloads page">
                <Stack gap={4} align="center" w="100%">
                    <IconDownload size={24} />
                    <Text size="lg" fw={600} ta="center" w="100%">
                        Download Latest Release
                    </Text>
                </Stack>
            </UnstyledButton>
        </Stack>
    );
}
