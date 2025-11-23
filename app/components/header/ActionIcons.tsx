import { Button, Group } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import metadata from "../../data/metadata.json";

export function ActionIcons() {
    return (
        <Group gap="sm">
            <Button
                component="a"
                href={metadata.repository}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="primary.2"
                leftSection={<IconBrandGithub size={20} />}>
                View on GitHub
            </Button>
        </Group>
    );
}
