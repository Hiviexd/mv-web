import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import type { CheckEntry } from "../../lib/checks";
import { GameModeDisplay } from "./GameModeDisplay";

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
                {check.beta ? (
                    <Badge size="sm" variant="light" color="yellow">
                        Beta
                    </Badge>
                ) : null}
            </Group>
            {(check.modes?.length ?? 0) > 0 || (check.difficulties?.length ?? 0) > 0 ? (
                <GameModeDisplay modes={check.modes} difficulties={check.difficulties} />
            ) : null}
            {check.author && (
                <Text size="xs" c="dimmed">
                    Author: {check.author}
                </Text>
            )}
        </Stack>
    );
}
