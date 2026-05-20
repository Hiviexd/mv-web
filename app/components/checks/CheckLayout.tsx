import { Box, Card, Collapse, Group, ScrollArea, Stack, Title, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";
import type { CategoryGroup } from "../../lib/checks";
import { CheckToc } from "./CheckToc";

interface CheckLayoutProps {
    groups: CategoryGroup[];
    activeSlug?: string;
    title?: string;
    children: ReactNode;
}

const SIDEBAR_MAX_HEIGHT =
    "calc(100vh - var(--app-shell-header-height, 60px) - var(--mantine-spacing-md) * 2)";

function MobileCheckToc({ groups, activeSlug }: { groups: CategoryGroup[]; activeSlug?: string }) {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Box className="check-layout__toc-mobile">
            <Card withBorder radius="md" padding="md">
                <UnstyledButton onClick={toggle} w="100%" aria-expanded={opened}>
                    <Group justify="space-between" wrap="nowrap">
                        <Title order={4}>Table of contents</Title>
                        <IconChevronDown
                            size={18}
                            style={{
                                transition: "transform 200ms ease",
                                transform: opened ? "rotate(180deg)" : undefined,
                            }}
                        />
                    </Group>
                </UnstyledButton>
                <Collapse in={opened}>
                    <Box pt="sm">
                        <CheckToc groups={groups} activeSlug={activeSlug} />
                    </Box>
                </Collapse>
            </Card>
        </Box>
    );
}

export function CheckLayout({ groups, activeSlug, title, children }: CheckLayoutProps) {
    return (
        <Box className="check-layout">
            <Box className="check-layout__toc-panel">
                <ScrollArea
                    type="always"
                    scrollbarSize={6}
                    offsetScrollbars
                    overscrollBehavior="contain"
                    h={SIDEBAR_MAX_HEIGHT}
                    p="xs"
                    pr="md">
                    <CheckToc groups={groups} activeSlug={activeSlug} />
                </ScrollArea>
            </Box>

            <Box className="check-layout__grid">
                <Box className="check-layout__toc-spacer" aria-hidden />
                <Stack className="check-layout__content" gap="xl">
                    {title && <Title order={1}>{title}</Title>}
                    <MobileCheckToc groups={groups} activeSlug={activeSlug} />
                    {children}
                </Stack>
            </Box>
        </Box>
    );
}
