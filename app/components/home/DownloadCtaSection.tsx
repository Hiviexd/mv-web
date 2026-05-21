import { Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Link } from "react-router";

export function DownloadCtaSection() {
    return (
        <section className="download-cta">
            <Stack gap="lg" align="center" ta="center" px="md">
                <Stack gap="sm" align="center" maw="36rem">
                    <Title order={2} c="primary.2">
                        Ready to try Mapset Verifier?
                    </Title>
                    <Text size="lg" c="dimmed">
                        Grab the latest release for your platform, or browse beta builds and release notes on the
                        downloads page.
                    </Text>
                </Stack>
                <UnstyledButton
                    component={Link}
                    to="/releases"
                    className="download-button download-cta__button"
                    aria-label="Go to downloads page">
                    <Stack gap={4} align="center">
                        <IconDownload size={24} />
                        <Text size="lg" fw={600}>
                            Go to Downloads
                        </Text>
                    </Stack>
                </UnstyledButton>
            </Stack>
        </section>
    );
}
