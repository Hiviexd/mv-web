import { Container, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

function ReleaseChannelCardSkeleton() {
    return (
        <Stack
            gap="md"
            p="xl"
            style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: "var(--mantine-radius-md)" }}>
            <Group justify="space-between" align="center" wrap="nowrap">
                <Stack gap="xs">
                    <Group gap="xs">
                        <Skeleton height={28} width={72} radius="xl" />
                        <Skeleton height={28} width={64} radius="xl" />
                    </Group>
                    <Skeleton height={32} width={120} radius="sm" />
                    <Skeleton height={14} width={96} radius="sm" />
                </Stack>
                <Skeleton height={52} width={52} radius="lg" />
            </Group>
            <Skeleton height={44} radius="sm" />
            <Group gap="xs" justify="center">
                <Skeleton height={14} width={64} radius="sm" />
                <Skeleton height={14} width={72} radius="sm" />
            </Group>
        </Stack>
    );
}

function ChangelogCardSkeleton() {
    return (
        <Stack
            gap="sm"
            p="md"
            style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: "var(--mantine-radius-md)" }}>
            <Group justify="space-between" wrap="nowrap">
                <Stack gap="xs" flex={1}>
                    <Group gap="sm">
                        <Skeleton height={24} width={180} radius="sm" />
                        <Skeleton height={22} width={56} radius="xl" />
                    </Group>
                    <Skeleton height={14} width={96} radius="sm" />
                </Stack>
                <Skeleton height={18} width={18} radius="sm" />
            </Group>
        </Stack>
    );
}

export function ReleasesSkeleton() {
    return (
        <Container size="lg" className="releases-page">
            <Stack gap="xl">
                <Skeleton height={40} width={160} radius="sm" />

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <ReleaseChannelCardSkeleton />
                    <ReleaseChannelCardSkeleton />
                </SimpleGrid>

                <Stack gap="md">
                    <Skeleton height={32} width={140} radius="sm" />
                    <ChangelogCardSkeleton />
                    <ChangelogCardSkeleton />
                    <ChangelogCardSkeleton />
                </Stack>
            </Stack>
        </Container>
    );
}
