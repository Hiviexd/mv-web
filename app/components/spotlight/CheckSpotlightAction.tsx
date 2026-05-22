import { Spotlight } from "@mantine/spotlight";
import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import type { CheckEntry } from "../../lib/checks";
import { sortTemplatesBySeverity } from "../../lib/checks";
import { CheckIcon, type CheckLevel } from "../checks/CheckIcon";
import { GameModeDisplay } from "../checks/GameModeDisplay";

interface CheckSpotlightActionProps {
    check: CheckEntry;
    onClick: () => void;
}

export function CheckSpotlightAction({ check, onClick }: CheckSpotlightActionProps) {
    const sortedTemplates = sortTemplatesBySeverity(check.templates);

    return (
        <Spotlight.Action onClick={onClick}>
            <Card
                className="spotlight-action-card"
                p="xs"
                radius="md"
                w="100%"
                withBorder={false}
                shadow="none"
                style={{ display: "flex" }}>
                <Group justify="space-between" align="stretch" wrap="nowrap" flex={1} w="100%">
                    <Stack gap="md" justify="space-between" flex={1} miw={0}>
                        <Text size="sm" lineClamp={2}>
                            {check.message}
                        </Text>
                        <Group gap="xs" wrap="wrap">
                            <Badge size="xs" variant="light" color="gray">
                                {check.category}
                            </Badge>
                            <Badge size="xs" variant="light" color="primary.2">
                                {check.checkType}
                            </Badge>
                            <GameModeDisplay modes={check.modes} size="sm" />
                        </Group>
                    </Stack>

                    <Stack gap="md" align="flex-end" justify="space-between" style={{ flexShrink: 0, alignSelf: "stretch" }}>
                        {sortedTemplates.length > 0 && (
                            <Group gap={4} wrap="nowrap" justify="flex-end">
                                {sortedTemplates.map((template) => (
                                    <CheckIcon
                                        key={template.key}
                                        level={(template.level as CheckLevel) ?? "Warning"}
                                        label={template.key}
                                        size={20}
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
        </Spotlight.Action>
    );
}
