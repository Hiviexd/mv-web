import { ActionIcon, Button, Group, Stack, Tooltip } from "@mantine/core";
import { IconBrandGithub, IconBug } from "@tabler/icons-react";
import metadata from "../../data/metadata.json";

interface RepositoryActionsProps {
    isMobile?: boolean;
    onNavigate?: () => void;
}

export function RepositoryActions({ isMobile, onNavigate }: RepositoryActionsProps) {
    if (isMobile) {
        return (
            <Stack gap="sm">
                <Button
                    component="a"
                    href={`${metadata.repository}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    color="primary.2"
                    leftSection={<IconBug size={20} />}
                    fullWidth
                    onClick={onNavigate}>
                    Report Issues
                </Button>
                <Button
                    component="a"
                    href={metadata.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    color="primary.2"
                    leftSection={<IconBrandGithub size={20} />}
                    fullWidth
                    onClick={onNavigate}>
                    Source Code
                </Button>
            </Stack>
        );
    }

    return (
        <Group gap="sm">
            <Tooltip label="Report Issues">
                <ActionIcon
                    size="lg"
                    component="a"
                    href={`${metadata.repository}/issues`}
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
                Source Code
            </Button>
        </Group>
    );
}
