import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { ThemeToggle } from "../ThemeToggle";
import metadata from "../../data/metadata.json";

export function ActionIcons() {
    return (
        <Group gap="sm">
            <Tooltip label="View on GitHub" position="bottom">
                <ActionIcon
                    component="a"
                    href={metadata.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="default">
                    <IconBrandGithub size={20} />
                </ActionIcon>
            </Tooltip>
            <ThemeToggle />
        </Group>
    );
}
