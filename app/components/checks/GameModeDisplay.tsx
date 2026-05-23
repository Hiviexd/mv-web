import { Divider, Group } from "@mantine/core";
import { GameModeIcon, normalizeMode } from "../base/GameModeIcon";

export interface GameModeDisplayProps {
    modes?: string[];
    difficulties?: string[];
    size?: "sm" | "md";
}

const DEFAULT_MODE = "osu";

const sizeConfig = {
    sm: {
        iconSize: 14,
        padding: 4,
        gap: 4,
        borderRadius: "0.5rem",
    },
    md: {
        iconSize: 20,
        padding: "xs" as const,
        gap: "sm" as const,
        borderRadius: "1rem",
    },
} as const;

export function GameModeDisplay({ modes = [], difficulties = [], size = "md" }: GameModeDisplayProps) {
    const hasModes = modes.length > 0;
    const hasDifficulties = difficulties.length > 0;
    if (!hasModes && !hasDifficulties) return null;

    const normalizedModes = [...new Set(modes.map(normalizeMode))];
    const config = sizeConfig[size];

    return (
        <Group
            gap={config.gap}
            wrap="nowrap"
            align="center"
            style={{
                borderRadius: config.borderRadius,
                backgroundColor: "var(--mantine-color-dark-5)",
                width: "fit-content",
            }}
            p={config.padding}>
            {hasModes && (
                <Group gap={4} wrap="nowrap">
                    {normalizedModes.map((mode) => (
                        <GameModeIcon key={mode} mode={mode} size={config.iconSize} />
                    ))}
                </Group>
            )}
            {hasModes && hasDifficulties && <Divider orientation="vertical" color="gray.5" />}
            {hasDifficulties && (
                <Group gap={4} wrap="wrap">
                    {difficulties.map((d) => (
                        <GameModeIcon key={d} mode={modes.length > 1 ? DEFAULT_MODE : modes[0]} difficulty={d} size={config.iconSize} />
                    ))}
                </Group>
            )}
        </Group>
    );
}
