import { Card, Container, Stack, Text, Title, Mark } from "@mantine/core";
import { Marquee } from "@gfazioli/mantine-marquee";

export function ChecksSection() {
    // Placeholder check data
    const checks = [
        { title: "Timing Check", description: "Verifies beatmap timing accuracy" },
        { title: "Metadata Validation", description: "Ensures all metadata is correct" },
        { title: "Difficulty Settings", description: "Validates difficulty configurations" },
        { title: "Hitsound Verification", description: "Checks hitsound implementation" },
        { title: "Slider Validation", description: "Verifies slider path integrity" },
        { title: "Spinner Check", description: "Validates spinner timing" },
        { title: "Storyboard Check", description: "Ensures storyboard compatibility" },
        { title: "Audio Sync", description: "Verifies audio synchronization" },
    ];

    return (
        <Stack gap="xl" mb="xl">
            <Title order={1} ta="center" c="primary.2">
                Over <Mark color="primary.2">110</Mark> unique beatmap checks
            </Title>
            <Stack gap="md">
                <Marquee w="100%" fadeEdges duration={40}>
                    {checks.map((check, index) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder maw={300} miw={250} mr="md">
                            <Title order={4} mb="xs">
                                {check.title}
                            </Title>
                            <Text size="sm" c="dimmed">
                                {check.description}
                            </Text>
                        </Card>
                    ))}
                </Marquee>
                <Marquee w="100%" fadeEdges reverse duration={40}>
                    {checks.map((check, index) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder maw={300} miw={250} mr="md">
                            <Title order={4} mb="xs">
                                {check.title}
                            </Title>
                            <Text size="sm" c="dimmed">
                                {check.description}
                            </Text>
                        </Card>
                    ))}
                </Marquee>
            </Stack>
        </Stack>
    );
}
