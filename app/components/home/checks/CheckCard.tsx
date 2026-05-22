import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Link } from "react-router";
import { getCheckPath } from "../../../lib/checks";
import { GameModeDisplay } from "../../checks/GameModeDisplay";

const hoverBackground = "color-mix(in srgb, var(--mantine-color-primary-2) 14%, var(--mantine-color-dark-7))";

const CARD_HEIGHT = 96;

interface CheckCardProps {
    check: {
        slug: string;
        message: string;
        checkType: string;
        modes?: string[];
    };
}

export function CheckCard({ check }: CheckCardProps) {
    const { hovered, ref } = useHover();

    return (
        <Link
            to={getCheckPath(check.slug)}
            style={{ textDecoration: "none", color: "inherit", display: "block", height: CARD_HEIGHT }}>
            <Card
                ref={ref}
                withBorder
                radius="md"
                padding="xs"
                miw={220}
                maw={280}
                mr="md"
                h="100%"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 120ms ease",
                    cursor: "pointer",
                    backgroundColor: hovered ? hoverBackground : "var(--mantine-color-dark-7)",
                }}>
                <Stack gap="md" justify="space-between" flex={1} miw={0}>
                    <Text fw={800} size="sm" lh={1.3} lineClamp={2}>
                        {check.message}
                    </Text>
                    <Group gap="xs" wrap="nowrap">
                        <GameModeDisplay modes={check.modes} size="sm" />
                        <Badge size="sm" variant="light" color="primary.2">
                            {check.checkType}
                        </Badge>
                    </Group>
                </Stack>
            </Card>
        </Link>
    );
}
