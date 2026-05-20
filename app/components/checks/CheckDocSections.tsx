import { lazy, Suspense } from "react";
import { Stack, Title } from "@mantine/core";
import type { CheckDocumentation } from "../../lib/checks";

const MarkdownText = lazy(() =>
    import("../base/MarkdownText").then((module) => ({ default: module.MarkdownText }))
);

interface CheckDocSectionsProps {
    documentation: CheckDocumentation;
}

export function CheckDocSections({ documentation }: CheckDocSectionsProps) {
    return (
        <Stack gap="md">
            {documentation.purpose && (
                <Stack gap="xs">
                    <Title order={3}>Purpose</Title>
                    <Suspense fallback={null}>
                        <MarkdownText content={documentation.purpose} />
                    </Suspense>
                </Stack>
            )}
            {documentation.reasoning && (
                <Stack gap="xs">
                    <Title order={3}>Reasoning</Title>
                    <Suspense fallback={null}>
                        <MarkdownText content={documentation.reasoning} />
                    </Suspense>
                </Stack>
            )}
        </Stack>
    );
}
