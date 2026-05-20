import { Box, Tooltip } from "@mantine/core";
import {
    IconAlertCircleFilled,
    IconCircleCheckFilled,
    IconHelpCircleFilled,
    IconCircleXFilled,
    IconInfoCircleFilled,
} from "@tabler/icons-react";
import type { CheckLevel } from "../../lib/checks";

export type { CheckLevel };

interface CheckIconProps {
    level: CheckLevel;
    size?: number;
    label?: string;
}

const levelConfig = {
    Problem: {
        Icon: IconCircleXFilled,
        color: "var(--check-icon-color-problem)",
        badge: false as const,
    },
    Warning: {
        Icon: IconAlertCircleFilled,
        color: "var(--check-icon-color-warning)",
        badge: false as const,
    },
    Error: {
        Icon: IconHelpCircleFilled,
        color: "var(--check-icon-color-error)",
        badge: false as const,
    },
    Minor: {
        Icon: IconCircleCheckFilled,
        color: "var(--check-icon-color-minor)",
        badge: true as const,
    },
    Info: {
        Icon: IconInfoCircleFilled,
        color: "var(--check-icon-color-info)",
        badge: false as const,
    },
} as const;

export function CheckIcon({ level, size = 20, label }: CheckIconProps) {
    const config = levelConfig[level] ?? levelConfig.Warning;
    const { Icon, color, badge } = config;
    const tooltipLabel = label ?? level;

    let icon = <Icon size={size} color={color} />;

    if (badge) {
        const badgeSize = Math.max(8, size * 0.45);
        icon = (
            <Box style={{ position: "relative", display: "inline-flex" }}>
                <Icon size={size} color={color} />
                <Box
                    style={{
                        position: "absolute",
                        right: -2,
                        bottom: -2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <IconAlertCircleFilled size={badgeSize} color="var(--check-icon-color-warning)" />
                </Box>
            </Box>
        );
    }

    return (
        <Tooltip label={tooltipLabel} position="top">
            <Box style={{ display: "inline-flex", lineHeight: 0 }}>{icon}</Box>
        </Tooltip>
    );
}
