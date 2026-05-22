import { Stack, Text, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";
import type { CategoryGroup } from "../../lib/checks";
import { getCheckPath } from "../../lib/checks";

interface CheckTocProps {
    groups: CategoryGroup[];
    activeSlug?: string;
    onLinkClick?: () => void;
}

export function CheckToc({ groups, activeSlug, onLinkClick }: CheckTocProps) {
    const location = useLocation();
    const isIndex = location.pathname === "/checks";

    return (
        <Stack gap="md">
            <Text size="xs" tt="uppercase" c="dimmed" fw={600}>
                Index
            </Text>
            <NavLink
                component={Link}
                to="/checks"
                label="Checks listing"
                active={isIndex}
                variant={isIndex ? "light" : "subtle"}
                color="primary.2"
                onClick={onLinkClick}
            />
            {groups.map((group) => (
                <Stack key={group.category} gap="xs">
                    <Text size="xs" tt="uppercase" c="dimmed" fw={600}>
                        {group.category}
                    </Text>
                    <Stack gap={4}>
                        {group.checks.map((check) => {
                            const isActive = activeSlug === check.slug;

                            return (
                                <NavLink
                                    key={check.slug}
                                    component={Link}
                                    to={getCheckPath(check.slug)}
                                    label={check.message}
                                    active={isActive}
                                    variant={isActive ? "light" : "subtle"}
                                    color="primary.2"
                                    onClick={onLinkClick}
                                />
                            );
                        })}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
