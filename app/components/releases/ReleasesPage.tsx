import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { getChangelogs, latestChangelogVersion } from "../../lib/changelogs";
import { releases } from "../../lib/release";
import { ChangelogCollapseCard } from "./ChangelogCollapseCard";
import { ReleaseChannelCard } from "./ReleaseChannelCard";

export function ReleasesPage() {
    const changelogs = getChangelogs();

    return (
        <Container size="lg" className="releases-page">
            <Stack gap="xl">
                <Title order={1}>Releases</Title>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <ReleaseChannelCard label="Stable" channel={releases.release} />
                    <ReleaseChannelCard label="Beta" channel={releases.beta} />
                </SimpleGrid>

                <Stack gap="md">
                    <Title order={2}>Changelog</Title>
                    {changelogs.length === 0 ? (
                        <Text c="dimmed">No changelog entries yet.</Text>
                    ) : (
                        changelogs.map((entry) => (
                            <ChangelogCollapseCard
                                key={entry.version}
                                entry={entry}
                                isLatest={entry.version === latestChangelogVersion}
                                initiallyExpanded={entry.version === latestChangelogVersion}
                            />
                        ))
                    )}
                </Stack>
            </Stack>
        </Container>
    );
}
