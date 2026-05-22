import { NavLink, Stack } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { getActiveNavRoute, NAV_ICON_SIZE, navigationLinks } from "../../config/navigation";

interface MobileNavigationLinksProps {
    onNavigate?: () => void;
}

export function MobileNavigationLinks({ onNavigate }: MobileNavigationLinksProps) {
    const location = useLocation();
    const activeRoute = getActiveNavRoute(location.pathname);

    return (
        <Stack>
            {navigationLinks.map((link) => {
                const isActive = link.href === activeRoute;

                return (
                    <NavLink
                        key={link.href}
                        label={link.label}
                        component={Link}
                        to={link.href}
                        leftSection={<link.icon size={NAV_ICON_SIZE} stroke={1.75} />}
                        onClick={onNavigate}
                        active={isActive}
                        variant={isActive ? "light" : "subtle"}
                        color="primary.2"
                    />
                );
            })}
        </Stack>
    );
}