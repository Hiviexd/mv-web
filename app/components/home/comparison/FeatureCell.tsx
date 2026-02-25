import { Stack, Table, ThemeIcon, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface IProps {
    supported: boolean;
    note?: string;
    highlight?: boolean;
    isLast?: boolean;
}

const highlightBg =
    "color-mix(in srgb, var(--mantine-color-primary-2) 12%, var(--mantine-color-body))";

export default function FeatureCell({ supported, note, highlight, isLast = false }: IProps) {
    return (
        <Table.Td
            style={{
                textAlign: "center",
                backgroundColor: highlight ? highlightBg : undefined,
                borderRadius: isLast ? "0 0 1rem 1rem" : undefined,
            }}>
            <Stack gap={4} align="center">
                <ThemeIcon
                    size="md"
                    radius="sm"
                    variant={supported ? "light" : "subtle"}
                    color={supported ? "green" : "gray"}>
                    {supported ? <IconCheck size={16} /> : <IconX size={16} />}
                </ThemeIcon>
                {note && (
                    <Text size="xs" c="dimmed">
                        {note}
                    </Text>
                )}
            </Stack>
        </Table.Td>
    );
}
