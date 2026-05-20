import { Badge, Card, Collapse, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { MarkdownText } from "../base/MarkdownText";
import type { ChangelogEntry } from "../../lib/changelogs";

interface ChangelogCollapseCardProps {
    entry: ChangelogEntry;
    isLatest: boolean;
    initiallyExpanded?: boolean;
}

export function ChangelogCollapseCard({
    entry,
    isLatest,
    initiallyExpanded = false,
}: ChangelogCollapseCardProps) {
    const [opened, { toggle }] = useDisclosure(initiallyExpanded);

    return (
        <Card shadow="sm" withBorder radius="md" padding="md" className="changelog-collapse-card" w="100%">
            <UnstyledButton
                type="button"
                onClick={toggle}
                w="100%"
                aria-expanded={opened}
                className="changelog-collapse-card__trigger">
                <Group justify="space-between" wrap="nowrap" align="flex-start" gap="sm">
                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap="sm" wrap="wrap">
                            <Text fw={700} size="xl" className="changelog-collapse-card__title">
                                {entry.title}
                            </Text>
                            {isLatest && (
                                <Badge color="blue" variant="light">
                                    Latest
                                </Badge>
                            )}
                        </Group>
                        {!opened && entry.preview && (
                            <Text size="sm" c="dimmed" lineClamp={2}>
                                {entry.preview}
                            </Text>
                        )}
                    </Stack>
                    <IconChevronDown
                        size={20}
                        className="changelog-collapse-card__chevron"
                        data-opened={opened || undefined}
                    />
                </Group>
            </UnstyledButton>

            <Collapse in={opened} my="md">
                {opened && <MarkdownText content={entry.body} />}
            </Collapse>
        </Card>
    );
}
