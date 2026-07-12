import { Box, Group, Skeleton, Stack } from "@mantine/core";

function CheckSummaryCardSkeleton() {
    return (
        <Box p="xs" style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: "var(--mantine-radius-md)" }}>
            <Group justify="space-between" align="stretch" gap="md" wrap="nowrap">
                <Stack gap="md" flex={1}>
                    <Skeleton height={14} width="85%" radius="sm" />
                    <Group gap="xs">
                        <Skeleton height={20} width={56} radius="xl" />
                        <Skeleton height={20} width={72} radius="xl" />
                    </Group>
                </Stack>
                <Stack gap="md" align="flex-end">
                    <Group gap={4}>
                        <Skeleton height={24} width={24} radius="sm" />
                        <Skeleton height={24} width={24} radius="sm" />
                    </Group>
                    <Skeleton height={12} width={64} radius="sm" />
                </Stack>
            </Group>
        </Box>
    );
}

function CheckCategorySectionSkeleton({ cardCount = 3 }: { cardCount?: number }) {
    return (
        <Stack gap="md">
            <Group justify="space-between">
                <Skeleton height={28} width={180} radius="sm" />
                <Skeleton height={14} width={64} radius="sm" />
            </Group>
            <Stack gap="sm">
                {Array.from({ length: cardCount }, (_, index) => (
                    <CheckSummaryCardSkeleton key={index} />
                ))}
            </Stack>
        </Stack>
    );
}

function CheckTocSkeleton() {
    return (
        <Stack gap="md">
            <Skeleton height={12} width={40} radius="sm" />
            <Skeleton height={32} width="100%" radius="sm" />
            <Stack gap="xs">
                <Skeleton height={12} width={120} radius="sm" />
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={index} height={28} width="100%" radius="sm" />
                ))}
            </Stack>
            <Stack gap="xs">
                <Skeleton height={12} width={96} radius="sm" />
                {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton key={index} height={28} width="100%" radius="sm" />
                ))}
            </Stack>
        </Stack>
    );
}

export function CheckIndexSkeleton() {
    return (
        <Stack gap="xl">
            <Skeleton height={36} radius="sm" />
            <CheckCategorySectionSkeleton cardCount={4} />
            <CheckCategorySectionSkeleton cardCount={3} />
            <CheckCategorySectionSkeleton cardCount={2} />
        </Stack>
    );
}

export function ChecksLayoutSkeleton() {
    return (
        <Box className="check-layout" style={{ paddingBlock: "var(--mantine-spacing-xl)", paddingInline: "var(--mantine-spacing-md)" }}>
            <Box className="check-layout__grid">
                <Box className="check-layout__toc-spacer" aria-hidden />
                <Stack className="check-layout__content" gap="xl">
                    <Skeleton height={36} width={280} radius="sm" />
                    <Box className="check-layout__toc-mobile">
                        <Box p="md" style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: "var(--mantine-radius-md)" }}>
                            <CheckTocSkeleton />
                        </Box>
                    </Box>
                    <CheckIndexSkeleton />
                </Stack>
            </Box>
        </Box>
    );
}
