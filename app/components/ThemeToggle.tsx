import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Tooltip label="Toggle color scheme" position="bottom">
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                variant="default"
                aria-label="Toggle color scheme">
                {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
        </Tooltip>
    );
}
