import { Stack, Title } from "@mantine/core";
import type { CheckDocumentation } from "../../lib/checks";
import { MarkdownText } from "../base/MarkdownText";

interface CheckDocSectionsProps {
    documentation: CheckDocumentation;
}

export function CheckDocSections({ documentation }: CheckDocSectionsProps) {
    return (
        <Stack gap="md">
            {documentation.purpose && (
                <Stack gap="xs">
                    <Title order={3}>Purpose</Title>
                    <MarkdownText content={documentation.purpose} />
                </Stack>
            )}
            {documentation.reasoning && (
                <Stack gap="xs">
                    <Title order={3}>Reasoning</Title>
                    <MarkdownText content={documentation.reasoning} />
                </Stack>
            )}
        </Stack>
    );
}
