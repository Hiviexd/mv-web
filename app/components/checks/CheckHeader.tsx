import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import type { CheckEntry } from "../../lib/checks";

interface CheckHeaderProps {
    check: CheckEntry;
}

export function CheckHeader({ check }: CheckHeaderProps) {
    return (
        <Stack gap="xs">
            <Title order={2}>{check.message}</Title>
            <Group gap="xs" wrap="wrap">
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
            {check.author && (
                <Text size="xs" c="dimmed">
                    Author: {check.author}
                </Text>
            )}
        </Stack>
    );
}
