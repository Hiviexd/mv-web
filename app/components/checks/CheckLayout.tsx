import { Box, Card, Container, Group, ScrollArea, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";
import type { CategoryGroup } from "../../lib/checks";
import { CheckToc } from "./CheckToc";

interface CheckLayoutProps {
    groups: CategoryGroup[];
    activeSlug?: string;
    title?: string;
    children: ReactNode;
}

const HEADER_HEIGHT = 90;
const SIDEBAR_WIDTH = 280;

export function CheckLayout({ groups, activeSlug, title, children }: CheckLayoutProps) {
    const sidebarHeight = `calc(100vh - ${HEADER_HEIGHT}px)`;

    return (
        <Container size="xl" py="xl">
            <Group align="flex-start" gap="xl" wrap="nowrap">
                {/* ToC sidebar: flex child, sticky so it stays left of content when scrolling */}
                <Box
                    visibleFrom="md"
                    w={SIDEBAR_WIDTH}
                    style={{
                        flexShrink: 0,
                        position: "sticky",
                        top: HEADER_HEIGHT,
                        height: sidebarHeight,
                        display: "flex",
                        flexDirection: "column",
                        borderInlineEnd: "1px solid var(--mantine-color-default-border)",
                        overflow: "hidden",
                    }}>
                    <ScrollArea type="hover" scrollbarSize={6} offsetScrollbars style={{ flex: 1, minHeight: 0 }}>
                        <Box py="xs" pr="md">
                            <CheckToc groups={groups} activeSlug={activeSlug} />
                        </Box>
                    </ScrollArea>
                </Box>

                {/* Main content */}
                <Stack flex={1} gap="xl" style={{ minWidth: 0 }}>
                    {title && <Title order={1}>{title}</Title>}
                    <Card withBorder radius="md" padding="md" hiddenFrom="md">
                        <Stack gap="sm">
                            <Title order={4}>Table of contents</Title>
                            <CheckToc groups={groups} activeSlug={activeSlug} />
                        </Stack>
                    </Card>
                    {children}
                </Stack>
            </Group>
        </Container>
    );
}
