import { memo } from "react";
import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router";
import type { CheckEntry } from "../../lib/checks";
import { getCheckPath, sortTemplatesBySeverity } from "../../lib/checks";
import { CheckIcon, type CheckLevel } from "./CheckIcon";
import { GameModeDisplay } from "./GameModeDisplay";

interface CheckSummaryCardProps {
    check: CheckEntry;
}

export const CheckSummaryCard = memo(function CheckSummaryCard({ check }: CheckSummaryCardProps) {
    const sortedTemplates = sortTemplatesBySeverity(check.templates);

    return (
        <Link to={getCheckPath(check.slug)} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <Card className="check-card" withBorder radius="md" padding="xs">
                <Group justify="space-between" align="stretch" gap="md" wrap="nowrap">
                    <Stack gap="md" flex={1} miw={0}>
                        <Text fw={600} size="sm" lh={1.3}>
                            {check.message}
                        </Text>
                        <Group gap="xs" wrap="nowrap">
                            <GameModeDisplay modes={check.modes} size="sm" />
                            <Badge size="sm" variant="light" color="gray">
                                {check.checkType}
                            </Badge>
                        </Group>
                    </Stack>

                    <Stack gap="md" align="flex-end" style={{ flexShrink: 0 }}>
                        {sortedTemplates.length > 0 && (
                            <Group gap={4} wrap="nowrap" justify="flex-end">
                                {sortedTemplates.map((template) => (
                                    <CheckIcon
                                        key={template.key}
                                        level={(template.level as CheckLevel) ?? "Warning"}
                                        label={template.key}
                                        size={24}
                                    />
                                ))}
                            </Group>
                        )}
                        {check.author && (
                            <Text size="xs" c="dimmed" lh={1} ta="right">
                                {check.author}
                            </Text>
                        )}
                    </Stack>
                </Group>
            </Card>
        </Link>
    );
});
