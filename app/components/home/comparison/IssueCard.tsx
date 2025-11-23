import { Card, Stack, Title, List, Text } from "@mantine/core";

interface IProps {
    toolName: string;
    issues: string[];
}

export default function IssueCard({ toolName, issues }: IProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <Title order={3} ta="center" c="primary.1">
                    {toolName}
                </Title>
                <List spacing="xs" size="sm">
                    {issues.map((issue, index) => (
                        <List.Item key={index}>
                            <Text>{issue}</Text>
                        </List.Item>
                    ))}
                </List>
            </Stack>
        </Card>
    );
}
