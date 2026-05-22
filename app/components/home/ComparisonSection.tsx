import { Stack, Table, Title, Text } from "@mantine/core";
import FeatureCell from "./comparison/FeatureCell";

interface FeatureComparison {
    feature: string;
    mapsetVerifier: {
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
        feature: "Up to date with current standards",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false, note: "Outdated" },
    },
    {
        feature: "Difficulty interpretation",
        mapsetVerifier: { supported: true, note: "Option/Name/SR" },
        aiMod: { supported: true, note: "SR" },
    },
    {
        feature: "Taiko/Catch/Mania-specific checks",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
    {
        feature: "Beatmap version history tracking",
        mapsetVerifier: { supported: true, note: "Snapshots" },
        aiMod: { supported: false },
    },
    {
        feature: "Timeline comparison",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
    {
        feature: "Snap usage overview",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
    {
        feature: "Difficulty, SV, and volume charts",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
    {
        feature: "Audio analysis",
        mapsetVerifier: { supported: true, note: "Spectrogram" },
        aiMod: { supported: false },
    },
    {
        feature: "Integrated documentation",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
    {
        feature: "Plugin support",
        mapsetVerifier: { supported: true },
        aiMod: { supported: false },
    },
];

export function ComparisonSection() {
    return (
        <Stack gap="lg" my="xl">
            <Title order={1} ta="center" c="primary.2">
                <i>Why</i> Mapset Verifier?
            </Title>
            <Text ta="center">Here's how it fares against other modding tools.</Text>
            <Table.ScrollContainer minWidth={600}>
                <Table verticalSpacing="sm" horizontalSpacing="md" borderColor="gray.7">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Feature</Table.Th>
                            <Table.Th
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "var(--mantine-color-primary-2)",
                                    color: "var(--mantine-color-black)",
                                    borderRadius: "1rem 1rem 0 0",
                                }}>
                                Mapset Verifier
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>AiMod</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {comparisons.map((comparison, index) => (
                            <Table.Tr key={index}>
                                <Table.Td w="60%">
                                    <Text fw={500}>{comparison.feature}</Text>
                                </Table.Td>
                                <FeatureCell
                                    supported={comparison.mapsetVerifier.supported}
                                    note={comparison.mapsetVerifier.note}
                                    highlight
                                    isLast={index === comparisons.length - 1}
                                />
                                <FeatureCell supported={comparison.aiMod.supported} note={comparison.aiMod.note} />
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
}
