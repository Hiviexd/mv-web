import { Stack, Table, ThemeIcon, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface IProps {
    supported: boolean;
    note?: string;
    highlight?: boolean;
}

export default function FeatureCell({ supported, note, highlight }: IProps) {
    return (
        <Table.Td
            style={{
                textAlign: "center",
                backgroundColor: highlight ? "var(--mantine-color-dark-6)" : undefined,
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
