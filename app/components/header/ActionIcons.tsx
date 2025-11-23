import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { IconBrandGithub, IconBug } from "@tabler/icons-react";
import metadata from "../../data/metadata.json";

export function ActionIcons() {
    return (
        <Group gap="sm">
            <Tooltip label="Report Issues">
                <ActionIcon
                    size="lg"
                    component="a"
                    href={metadata.repository + "/issues"}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    color="primary.2">
                    <IconBug size={20} />
                </ActionIcon>
            </Tooltip>
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
