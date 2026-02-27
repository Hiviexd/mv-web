import { Box, Divider, Group } from "@mantine/core";
import { GameModeIcon, normalizeMode } from "../base/GameModeIcon";

export interface GameModeDisplayProps {
    modes?: string[];
    difficulties?: string[];
}

/** Squircle-like border radius (between square and circle). */
const SQUIRCLE_RADIUS = "1rem";

const DEFAULT_MODE = "osu";

export function GameModeDisplay({ modes = [], difficulties = [] }: GameModeDisplayProps) {
    const hasModes = modes.length > 0;
    const hasDifficulties = difficulties.length > 0;
    if (!hasModes && !hasDifficulties) return null;

    const normalizedModes = [...new Set(modes.map(normalizeMode))];

    return (
        <Group
            gap="sm"
            wrap="nowrap"
            align="center"
            style={{
                borderRadius: SQUIRCLE_RADIUS,
                backgroundColor: "var(--mantine-color-dark-5)",
                width: "fit-content",
            }}
            p="xs">
            {hasModes && (
                <Group gap={4} wrap="nowrap">
                    {normalizedModes.map((mode) => (
                        <GameModeIcon key={mode} mode={mode} size={20} />
                    ))}
                </Group>
            )}
            {hasModes && hasDifficulties && (
                <Divider orientation="vertical" color="gray.5" />
            )}
            {hasDifficulties && (
                <Group gap={4} wrap="wrap">
                    {difficulties.map((d) => (
                        <GameModeIcon key={d} mode={DEFAULT_MODE} difficulty={d} size={20} />
                    ))}
                </Group>
            )}
        </Group>
    );
}
