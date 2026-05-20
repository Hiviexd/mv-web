import { Box, FloatingIndicator, Group, useMantineTheme } from "@mantine/core";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
    getActiveNavRoute,
    NAV_BORDER_RADIUS,
    NAV_INDICATOR_TRANSITION_MS,
    navigationLinks,
} from "../../config/navigation";
import { NavigationLinkTab } from "./NavigationLinkTab";

export function NavigationLinks() {
    const theme = useMantineTheme();
    const location = useLocation();
    const activeRoute = getActiveNavRoute(location.pathname);

    const [navRootEl, setNavRootEl] = useState<HTMLElement | null>(null);
    const [targetControl, setTargetControl] = useState<HTMLElement | null>(null);
    const controlsRefs = useRef<Partial<Record<string, HTMLElement | null>>>({});

    const attachNavRoot = useCallback(
        (el: HTMLElement | null) => setNavRootEl((prev) => (prev === el ? prev : el)),
        [],
    );

    const setControlRef = useMemo(() => {
        const refs: Partial<Record<string, (node: HTMLElement | null) => void>> = {};
        for (const item of navigationLinks) {
            const href = item.href;
            refs[href] = (node) => {
                controlsRefs.current[href] = node;
            };
        }
        return refs as Record<string, (node: HTMLElement | null) => void>;
    }, []);

    useLayoutEffect(() => {
        const node = activeRoute ? (controlsRefs.current[activeRoute] ?? null) : null;
        setTargetControl((prev) => (prev === node ? prev : node));
    }, [activeRoute, navRootEl]);

    return (
        <Box
            ref={attachNavRoot}
            component="nav"
            aria-label="Main pages"
            pos="relative"
            p={0}
            style={{ display: "inline-flex", alignItems: "stretch" }}>
            <FloatingIndicator
                parent={navRootEl}
                target={targetControl}
                transitionDuration={NAV_INDICATOR_TRANSITION_MS}
                styles={{
                    root: {
                        backgroundColor: theme.colors.primary[2],
                        borderRadius: NAV_BORDER_RADIUS,
                        boxShadow: "none",
                        zIndex: 0,
                        pointerEvents: "none",
                    },
                }}
            />
            <Group gap="xs" wrap="nowrap">
                {navigationLinks.map((item) => (
                    <NavigationLinkTab
                        key={item.href}
                        item={item}
                        activeRoute={activeRoute}
                        controlRef={setControlRef[item.href]}
                    />
                ))}
            </Group>
        </Box>
    );
}
