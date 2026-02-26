import { Anchor, Card, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import type { CategoryGroup } from "../../lib/checks";
import { getCheckLevels } from "../../lib/checks";
import { IconAlertTriangle, IconInfoCircle, IconX } from "@tabler/icons-react";

const levelConfig = {
    Problem: { icon: IconX, color: "red.6" },
    Warning: { icon: IconAlertTriangle, color: "orange.6" },
    Minor: { icon: IconInfoCircle, color: "yellow.6" },
};

interface CheckIndexListProps {
    groups: CategoryGroup[];
}

const slugify = (value: string) =>
    value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

export function CheckIndexList({ groups }: CheckIndexListProps) {
    return (
        <Stack gap="xl">
            {groups.map((group) => (
                <Stack key={group.category} gap="md" id={slugify(group.category)}>
                    <Group justify="space-between">
                        <Title order={2}>{group.category}</Title>
                        <Text size="xs" c="dimmed">
                            {group.checks.length} checks
                        </Text>
                    </Group>
                    <Stack gap="sm">
                        {group.checks.map((check) => {
                            const levels = getCheckLevels(check);

                            return (
                                <Card key={check.slug} id={check.slug} withBorder radius="md" padding="md">
                                    <Group justify="space-between" align="flex-start">
                                        <Stack gap={4}>
                                            <Anchor component={Link} to={`/checks/${check.slug}`} fw={600}>
                                                {check.message}
                                            </Anchor>
                                            <Text size="xs" c="dimmed">
                                                {check.checkType}
                                            </Text>
                                        </Stack>
                                        <Group gap={6}>
                                            {levels.map((level) => {
                                                const Icon = levelConfig[level].icon;
                                                return <Icon key={level} size={18} color={levelConfig[level].color} />;
                                            })}
                                        </Group>
                                    </Group>
                                </Card>
                            );
                        })}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
