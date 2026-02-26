import { Box } from "@mantine/core";
import {
    IconAlertCircleFilled,
    IconAlertTriangle,
    IconCircleCheckFilled,
    IconHelpCircleFilled,
    IconCircleXFilled,
} from "@tabler/icons-react";

export type CheckLevel = "Problem" | "Warning" | "Error" | "Minor";

interface CheckIconProps {
    level: CheckLevel;
    size?: number;
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
} as const;

export function CheckIcon({ level, size = 20 }: CheckIconProps) {
    const config = levelConfig[level] ?? levelConfig.Warning;
    const { Icon, color, badge } = config;

    if (badge) {
        const badgeSize = Math.max(8, size * 0.45);
        return (
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
                    <IconAlertCircleFilled
                        size={badgeSize}
                        color="var(--check-icon-color-warning)"
                    />
                </Box>
            </Box>
        );
    }

    return <Icon size={size} color={color} />;
}
