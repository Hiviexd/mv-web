import type { Route } from "./+types/checks.$checkSlug";
import { CheckDocSections } from "../components/checks/CheckDocSections";
import { CheckDetailTemplates } from "../components/checks/CheckDetailTemplates";
import { CheckHeader } from "../components/checks/CheckHeader";
import { CheckNav } from "../components/checks/CheckNav";
import { getCheckBySlug, getPrevNextInCategory } from "../lib/checks";
import { Alert, Anchor, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router";
import { IconInfoCircle } from "@tabler/icons-react";

export function meta({ params }: Route.MetaArgs) {
    const check = getCheckBySlug(params.checkSlug ?? "");
    const title = check ? `${check.message} - Mapset Verifier` : "Check not found - Mapset Verifier";

    return [
        { title },
        {
            name: "description",
            content: check
                ? `Documentation for the ${check.message} check.`
                : "Requested check documentation could not be found.",
        },
    ];
}

export default function CheckDetail({ params }: Route.ComponentProps) {
    const check = getCheckBySlug(params.checkSlug ?? "");

    if (!check) {
        return (
            <Alert color="red" icon={<IconInfoCircle size={18} />} radius="md">
                We could not find that check. Try selecting one from the list.
            </Alert>
        );
    }

    const { previous, next } = getPrevNextInCategory(check.slug);

    return (
        <Stack gap="xl">
            <Stack gap="xs">
                <Group gap="xs">
                    <Anchor component={Link} to="/checks" size="sm" c="dimmed">
                        Checks
                    </Anchor>
                    <Text size="sm" c="dimmed">
                        / {check.category}
                    </Text>
                </Group>
                <CheckHeader check={check} />
            </Stack>
            <CheckDocSections documentation={check.documentation} />
            <CheckDetailTemplates templates={check.templates} />
            <CheckNav previous={previous} next={next} />
        </Stack>
    );
}
