import { Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

function HeroSkeleton() {
    return (
        <>
            <Group visibleFrom="md" align="center" gap="xl" mih="60vh" wrap="nowrap">
                <Stack flex={1} gap="xl" align="center">
                    <Skeleton height={120} width={120} radius="50%" />
                    <Stack gap="lg" align="center" w="100%">
                        <Skeleton height={20} width="80%" radius="sm" />
                        <Skeleton height={20} width="60%" radius="sm" />
                        <Skeleton height={52} width={200} radius="md" />
                    </Stack>
                </Stack>
                <Skeleton flex={1} maw="50%" height={320} radius="md" />
            </Group>

            <Stack hiddenFrom="md" w="100%" gap="xl" align="center" mih="60vh" pt="xl">
                <Stack gap="xl" align="center" w="100%" px="md">
                    <Skeleton height={80} width={80} radius="50%" />
                    <Stack gap="lg" align="center" w="100%">
                        <Skeleton height={20} width="90%" radius="sm" />
                        <Skeleton height={20} width="70%" radius="sm" />
                        <Skeleton height={52} width={200} radius="md" />
                    </Stack>
                </Stack>
                <Skeleton maw="28rem" w="100%" height={200} radius="md" />
            </Stack>
        </>
    );
}

function ChecksMarqueeSkeleton() {
    return (
        <Stack gap="xl" mb="xl">
            <Group justify="center" gap="xs">
                <Skeleton height={32} width={120} radius="sm" />
                <Skeleton height={32} width={48} radius="sm" />
                <Skeleton height={32} width={140} radius="sm" />
            </Group>
            <Stack gap="md">
                <Group gap="md" wrap="nowrap">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} height={96} width={240} radius="md" style={{ flexShrink: 0 }} />
                    ))}
                </Group>
                <Group gap="md" wrap="nowrap">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} height={96} width={240} radius="md" style={{ flexShrink: 0 }} />
                    ))}
                </Group>
            </Stack>
        </Stack>
    );
}

function HomeSectionSkeleton({ inverse = false }: { inverse?: boolean }) {
    const text = (
        <Stack flex={1} gap="md" justify="center">
            <Skeleton height={28} width="70%" radius="sm" />
            <Skeleton height={16} width="100%" radius="sm" />
            <Skeleton height={16} width="92%" radius="sm" />
            <Skeleton height={16} width="78%" radius="sm" />
        </Stack>
    );
    const media = <Skeleton flex={1} height={280} radius="md" maw="100%" />;

    return (
        <section className="home-section">
            <Group className="home-section__layout" visibleFrom="md" align="center" gap="xl" wrap="nowrap">
                {inverse ? (
                    <>
                        {media}
                        {text}
                    </>
                ) : (
                    <>
                        {text}
                        {media}
                    </>
                )}
            </Group>
            <Stack className="home-section__layout" hiddenFrom="md" gap="xl" align="center">
                {text}
                <Skeleton w="100%" height={200} radius="md" />
            </Stack>
        </section>
    );
}

function ComparisonSkeleton() {
    return (
        <Stack gap="lg" align="center">
            <Skeleton height={32} width={280} radius="sm" />
            <Stack gap="xs" w="100%" maw="48rem">
                {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} height={44} radius="sm" />
                ))}
            </Stack>
        </Stack>
    );
}

function DownloadCtaSkeleton() {
    return (
        <section className="download-cta">
            <Stack gap="lg" align="center" ta="center" px="md">
                <Stack gap="sm" align="center" maw="36rem">
                    <Skeleton height={28} width={320} radius="sm" />
                    <Skeleton height={16} width="100%" radius="sm" />
                    <Skeleton height={16} width="85%" radius="sm" />
                </Stack>
                <Skeleton height={72} width={200} radius="md" />
            </Stack>
        </section>
    );
}

function HomeFooterSkeleton() {
    return (
        <footer className="home-footer">
            <div className="home-footer__inner">
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" verticalSpacing="xl">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Stack key={index} gap="md">
                            <Skeleton height={24} width={index === 0 ? 180 : 120} radius="sm" />
                            <Skeleton height={14} width="90%" radius="sm" />
                            <Skeleton height={14} width="75%" radius="sm" />
                            <Skeleton height={14} width="60%" radius="sm" />
                        </Stack>
                    ))}
                </SimpleGrid>
            </div>
        </footer>
    );
}

export function HomeSkeleton() {
    return (
        <Stack gap="xl">
            <HeroSkeleton />
            <ChecksMarqueeSkeleton />
            <HomeSectionSkeleton />
            <HomeSectionSkeleton inverse />
            <HomeSectionSkeleton />
            <ComparisonSkeleton />
            <DownloadCtaSkeleton />
            <HomeFooterSkeleton />
        </Stack>
    );
}
