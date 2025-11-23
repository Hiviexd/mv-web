import { Stack, Table, Title, Text, SimpleGrid } from "@mantine/core";
import FeatureCell from "./comparison/FeatureCell";
import IssueCard from "./comparison/IssueCard";

interface FeatureComparison {
    feature: string;
    mapsetVerifier: {
        supported: boolean;
        note?: string;
    };
    moddingAssistant: {
        supported: boolean;
        note?: string;
    };
    aiMod: {
        supported: boolean;
        note?: string;
    };
}

const comparisons: FeatureComparison[] = [
    {
        feature: "Difficulty Interpretation",
        mapsetVerifier: { supported: true, note: "Option, Name, SR" },
        moddingAssistant: { supported: true, note: "Name, SR" },
        aiMod: { supported: true, note: "SR" },
    },
    {
        feature: "Snapshots",
        mapsetVerifier: { supported: true, note: "Automatic" },
        moddingAssistant: { supported: true, note: "Manual" },
        aiMod: { supported: false },
    },
    {
        feature: "Integrated Documentation",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: true, note: "RC Snippets" },
        aiMod: { supported: false },
    },
    {
        feature: "Timeline Comparison",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: true, note: "osu!aiko-only" },
        aiMod: { supported: false },
    },
    {
        feature: "Song folder detection",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: false },
        aiMod: { supported: true },
    },
    {
        feature: "Automatic Updates",
        mapsetVerifier: { supported: true, note: "Windows-only" },
        moddingAssistant: { supported: false },
        aiMod: { supported: true },
    },
    {
        feature: "Verbose Mode",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: false },
        aiMod: { supported: true },
    },
    {
        feature: "Plugin Support",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: false },
        aiMod: { supported: false },
    },
    {
        feature: "Open Source",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: false },
        aiMod: { supported: false },
    },
    {
        feature: "Difficulty Graph",
        mapsetVerifier: { supported: true },
        moddingAssistant: { supported: true, note: "Outdated SR" },
        aiMod: { supported: false },
    },
];

export function ComparisonSection() {
    return (
        <Stack gap="lg" my="xl">
            <Title order={1} ta="center" c="primary.2">
                <i>Why</i> Mapset Verifier?
            </Title>
            <Text ta="center" c="dimmed">
                Here's how it fares against other modding tools.
            </Text>
            <Table.ScrollContainer minWidth={600}>
                <Table verticalSpacing="sm" horizontalSpacing="md" withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Feature</Table.Th>
                            <Table.Th
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "var(--mantine-color-primary-2)",
                                    color: "var(--mantine-color-black)",
                                }}>
                                Mapset Verifier
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>Modding Assistant</Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>AiMod</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {comparisons.map((comparison, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>
                                    <Text fw={500}>{comparison.feature}</Text>
                                </Table.Td>
                                <FeatureCell
                                    supported={comparison.mapsetVerifier.supported}
                                    note={comparison.mapsetVerifier.note}
                                    highlight
                                />
                                <FeatureCell
                                    supported={comparison.moddingAssistant.supported}
                                    note={comparison.moddingAssistant.note}
                                />
                                <FeatureCell supported={comparison.aiMod.supported} note={comparison.aiMod.note} />
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Stack gap="xl" mt="xl">
                <Title order={3} ta="center">
                    Here's some more issues from other tools that we fix
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    <IssueCard
                        toolName="Modding Assistant"
                        issues={[
                            "counting extended break times as drain time.",
                            "failing to account for minimum SV (0.1x).",
                            "misinterpreting hit sounds on slider bodies as hit sounds on heads/tails.",
                            "completely ignoring storyboard variables and animation frames.",
                        ]}
                    />
                    <IssueCard
                        toolName="AiMod"
                        issues={[
                            "incorrectly detecting unsnaps on slider tails < 2 ms off",
                            "not accounting for stacking.",
                            "using a vastly outdated star rating system, saying you need an easy/normal when you already have one.",
                            "using inaccurate playfield measurements to detect offscreen hit objects.",
                        ]}
                    />
                </SimpleGrid>
            </Stack>
        </Stack>
    );
}
