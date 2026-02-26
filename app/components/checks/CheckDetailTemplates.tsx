import { Blockquote, Group, Mark, Stack, Text, Title } from "@mantine/core";
import type { CheckTemplate } from "../../lib/checks";
import { CheckIcon, type CheckLevel } from "./CheckIcon";

const levelConfig = {
    Problem: { color: "var(--check-icon-color-problem)" },
    Warning: { color: "var(--check-icon-color-warning)" },
    Minor: { color: "var(--check-icon-color-minor)" },
    Error: { color: "var(--check-icon-color-error)" },
};

const severityOrder: CheckLevel[] = ["Problem", "Warning", "Minor", "Error"];

function sortTemplatesBySeverity(templates: CheckTemplate[]): CheckTemplate[] {
    return [...templates].sort((a, b) => {
        const aIndex = severityOrder.indexOf(a.level as CheckLevel);
        const bIndex = severityOrder.indexOf(b.level as CheckLevel);
        const ai = aIndex === -1 ? severityOrder.length : aIndex;
        const bi = bIndex === -1 ? severityOrder.length : bIndex;
        return ai - bi;
    });
}

const renderFormatString = (formatString: string, defaultArguments: string[]) => {
    const parts = formatString.split(/(\{\d+\})/g);

    return parts.map((part, index) => {
        const match = part.match(/^\{(\d+)\}$/);
        if (match) {
            const argIndex = Number(match[1]);
            const value = defaultArguments[argIndex] ?? part;
            return (
                <Mark key={`${part}-${index}`} color="dark" c="primary.2">
                    {value}
                </Mark>
            );
        }

        return (
            <Text span key={`${part}-${index}`} c="dimmed">
                {part}
            </Text>
        );
    });
};

interface CheckDetailTemplatesProps {
    templates: CheckTemplate[];
}

export function CheckDetailTemplates({ templates }: CheckDetailTemplatesProps) {
    if (!templates.length) {
        return null;
    }

    const sortedTemplates = sortTemplatesBySeverity(templates);

    return (
        <Stack gap="md">
            <Title order={3} mb="md">Templates</Title>
            {sortedTemplates.map((template) => {
                const config = levelConfig[template.level as keyof typeof levelConfig] ?? levelConfig.Warning;
                const level = (template.level as CheckLevel) ?? "Warning";

                return (
                    <Blockquote
                        key={template.key}
                        color={config.color}
                        icon={<CheckIcon level={level} size={25} />}
                        radius="md">
                        <Group gap="xs" mb="xs">
                            <Text fw={600}>{template.key}</Text>
                        </Group>
                        <Text size="sm">{renderFormatString(template.formatString, template.defaultArguments)}</Text>
                        {template.cause && (
                            <Text size="xs" c="dimmed" mt="xs">
                                Cause: {template.cause}
                            </Text>
                        )}
                    </Blockquote>
                );
            })}
        </Stack>
    );
}
