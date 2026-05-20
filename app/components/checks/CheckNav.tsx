import { Button, Group } from "@mantine/core";
import { Link } from "react-router";
import type { CheckEntry } from "../../lib/checks";
import { getCheckPath } from "../../lib/checks";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface CheckNavProps {
    previous?: CheckEntry;
    next?: CheckEntry;
}

export function CheckNav({ previous, next }: CheckNavProps) {
    if (!previous && !next) {
        return null;
    }

    return (
        <Group justify="space-between" mt="xl">
            {previous ? (
                <Button
                    component={Link}
                    to={getCheckPath(previous.slug)}
                    variant="subtle"
                    color="primary.2"
                    leftSection={<IconArrowLeft size={18} />}
                >
                    {previous.message}
                </Button>
            ) : (
                <div />
            )}
            {next && (
                <Button
                    component={Link}
                    to={getCheckPath(next.slug)}
                    variant="subtle"
                    color="primary.2"
                    rightSection={<IconArrowRight size={18} />}
                >
                    {next.message}
                </Button>
            )}
        </Group>
    );
}
