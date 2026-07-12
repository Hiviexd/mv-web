import { Group, Skeleton, Stack } from "@mantine/core";

export function MarkdownContentSkeleton() {
    return (
        <Stack gap="xs">
            <Skeleton height={12} radius="sm" />
            <Skeleton height={12} radius="sm" />
            <Skeleton height={12} radius="sm" width="92%" />
            <Skeleton height={12} radius="sm" width="78%" />
            <Skeleton height={180} radius="md" mt="sm" />
            <Skeleton height={12} radius="sm" mt="sm" />
            <Skeleton height={12} radius="sm" />
            <Skeleton height={12} radius="sm" width="85%" />
        </Stack>
    );
}

export function CheckDetailSkeleton() {
    return (
        <Stack gap="xl">
            <Stack gap="xs">
                <Group gap="xs">
                    <Skeleton height={14} width={48} radius="sm" />
                    <Skeleton height={14} width={120} radius="sm" />
                </Group>
                <Skeleton height={32} width="75%" radius="sm" />
                <Group gap="xs">
                    <Skeleton height={22} width={96} radius="xl" />
                    <Skeleton height={22} width={72} radius="xl" />
                </Group>
                <Skeleton height={14} width={140} radius="sm" />
            </Stack>

            <Stack gap="md">
                <Stack gap="xs">
                    <Skeleton height={24} width={80} radius="sm" />
                    <MarkdownContentSkeleton />
                </Stack>
                <Stack gap="xs">
                    <Skeleton height={24} width={96} radius="sm" />
                    <MarkdownContentSkeleton />
                </Stack>
            </Stack>

            <Stack gap="md">
                <Skeleton height={24} width={100} radius="sm" />
                <Skeleton height={88} radius="md" />
                <Skeleton height={72} radius="md" />
            </Stack>

            <Group justify="space-between">
                <Skeleton height={36} width={112} radius="sm" />
                <Skeleton height={36} width={112} radius="sm" />
            </Group>
        </Stack>
    );
}
