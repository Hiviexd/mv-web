import { alpha, Group, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
    NAV_BORDER_RADIUS,
    NAV_ICON_SIZE,
    NAV_INDICATOR_TRANSITION_MS,
    type NavigationLink,
} from "../../config/navigation";

export interface NavigationLinkTabProps {
    item: NavigationLink;
    activeRoute: string | null;
    controlRef: (node: HTMLElement | null) => void;
}

export function NavigationLinkTab({ item, activeRoute, controlRef }: NavigationLinkTabProps) {
    const theme = useMantineTheme();
    const [hovered, setHovered] = useState(false);

    const isActive = item.href === activeRoute;
    const labelColor = isActive ? theme.black : theme.colors.dark[0];
    const Icon = item.icon;

    const shellStyles = useMemo(
        () => ({
            position: "relative" as const,
            zIndex: 1,
            borderRadius: NAV_BORDER_RADIUS,
            fontFamily: theme.fontFamily,
            fontWeight: 600 as const,
            fontSize: theme.fontSizes.sm,
            lineHeight: 1,
            color: labelColor,
            transition: `color ${NAV_INDICATOR_TRANSITION_MS}ms ease, background-color 120ms ease`,
        }),
        [labelColor, theme.fontFamily, theme.fontSizes.sm],
    );

    const inactiveHoverBg = alpha(theme.white, 0.1);

    return (
        <UnstyledButton
            ref={controlRef}
            component={Link}
            to={item.href}
            data-nav-route={item.href}
            data-active={isActive || undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...shellStyles,
                ...(hovered && !isActive ? { backgroundColor: inactiveHoverBg } : undefined),
            }}>
            <Group gap={8} px={12} py={7} wrap="nowrap">
                <Icon size={NAV_ICON_SIZE} stroke={1.75} aria-hidden />
                <Text component="span" fz="inherit" fw="inherit" lh={1}>
                    {item.label}
                </Text>
            </Group>
        </UnstyledButton>
    );
}
