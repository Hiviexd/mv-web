import { Badge, Card, Group, Title } from "@mantine/core";
import { IconAlertTriangle, IconInfoCircle, IconX } from "@tabler/icons-react";

const levelOrder = ["Problem", "Warning", "Minor"] as const;
const levelConfig = {
    Problem: { icon: IconX, color: "red.6" },
    Warning: { icon: IconAlertTriangle, color: "orange.6" },
    Minor: { icon: IconInfoCircle, color: "yellow.6" },
};

type TemplateEntry = { level?: string } | undefined;

interface CheckCardProps {
    check: {
        message: string;
        category: string;
        checkType: string;
        templates?: Record<string, TemplateEntry>;
        modes?: string[];
        difficulties?: string[];
    };
}

const getLevels = (templates: Record<string, TemplateEntry> | undefined) => {
    const levels = new Set<string>();

    Object.values(templates ?? {}).forEach((template) => {
        if (template?.level) {
            levels.add(template.level);
        }
    });

    return levelOrder.filter((level) => levels.has(level));
};

export function CheckCard({ check }: CheckCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder maw={300} miw={250} mr="md">
            <Title order={4} mb="xs">
                {check.message}
            </Title>
            <Group gap={6} mb="xs">
                {getLevels(check.templates).map((level) => {
                    const Icon = levelConfig[level].icon;

                    return <Icon key={level} size={18} color={levelConfig[level].color} />;
                })}
            </Group>
            <Group gap={6} wrap="wrap">
                <Badge size="sm" variant="light" color="primary.2">
                    {check.category}
                </Badge>
                <Badge size="sm" variant="light" color="gray">
                    {check.checkType}
                </Badge>
                {(check.modes ?? []).map((mode) => (
                    <Badge key={mode} size="sm" variant="outline" color="blue">
                        {mode}
                    </Badge>
                ))}
                {(check.difficulties ?? []).map((difficulty) => (
                    <Badge key={difficulty} size="xs" variant="outline" color="gray">
                        {difficulty}
                    </Badge>
                ))}
            </Group>
        </Card>
    );
}
