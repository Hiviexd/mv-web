import { Card, Container, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconBolt, IconChecks, IconCode, IconBrandGithub } from "@tabler/icons-react";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <IconBolt size={28} />,
        title: "Real-time Verification",
        description:
            "Get instant feedback on your beatmaps as you create them. Our verification engine runs in real-time to catch issues immediately.",
    },
    {
        icon: <IconChecks size={28} />,
        title: "Comprehensive Checks",
        description:
            "Over 100+ automated checks covering timing, metadata, difficulty settings, hitsounds, and more. Never miss a detail again.",
    },
    {
        icon: <IconCode size={28} />,
        title: "Easy Integration",
        description:
            "Seamlessly integrates with your workflow. Simple to use interface with detailed error messages and suggestions for fixes.",
    },
    {
        icon: <IconBrandGithub size={28} />,
        title: "Open Source",
        description:
            "Fully open source and community-driven. Contribute checks, report issues, or customize it to fit your needs.",
    },
];

export function FeatureSection() {
    return (
        <section>
            <Container size="xl">
                <Stack gap="xl">
                    <Title order={2} ta="center">
                        Why Choose Mapset Verifier?
                    </Title>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                        {features.map((feature, index) => (
                            <Card key={index} shadow="sm" padding="xl" radius="md" withBorder>
                                <ThemeIcon size={60} radius="md" variant="light" mb="sm">
                                    {feature.icon}
                                </ThemeIcon>
                                <Title order={3} mt="md">
                                    {feature.title}
                                </Title>
                                <Text c="dimmed" mt="sm">
                                    {feature.description}
                                </Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </section>
    );
}
