import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Anchor, Alert, Code, Divider, List, Text, Title } from "@mantine/core";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { IconInfoCircleFilled } from "@tabler/icons-react";

interface MarkdownTextProps {
    content?: string | null;
}

export function MarkdownText({ content }: MarkdownTextProps) {
    if (!content) {
        return null;
    }

    return (
        <div className="markdown-text">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }: { children?: ReactNode }) => (
                        <Title order={2} mt="md" mb="xs">
                            {children}
                        </Title>
                    ),
                    h2: ({ children }: { children?: ReactNode }) => (
                        <Title order={3} mt="md" mb="xs">
                            {children}
                        </Title>
                    ),
                    h3: ({ children }: { children?: ReactNode }) => (
                        <Title order={4} mt="md" mb="xs">
                            {children}
                        </Title>
                    ),
                    p: ({ children }: { children?: ReactNode }) => (
                        <Text size="sm" c="dimmed" mb="sm">
                            {children}
                        </Text>
                    ),
                    ul: ({ children }: { children?: ReactNode }) => (
                        <List c="dimmed" size="sm" spacing="xs" mb="sm" withPadding>
                            {children}
                        </List>
                    ),
                    ol: ({ children }: { children?: ReactNode }) => (
                        <List c="dimmed" size="sm" spacing="xs" type="ordered" mb="sm" withPadding>
                            {children}
                        </List>
                    ),
                    li: ({ children }: { children?: ReactNode }) => <List.Item>{children}</List.Item>,
                    a: ({ href, children }: { href?: string; children?: ReactNode }) => (
                        <Anchor size="sm" href={href} target="_blank" rel="noreferrer">
                            {children}
                        </Anchor>
                    ),
                    code: ({ children }: { children?: ReactNode }) => <Code>{children}</Code>,
                    blockquote: ({ children }: { children?: ReactNode }) => (
                        <Alert
                            className="blockquote"
                            color="blue"
                            radius="md"
                            title="Note"
                            my="md"
                            icon={<IconInfoCircleFilled size={18} />}>
                            {children}
                        </Alert>
                    ),
                    hr: () => <Divider my="xl" />,
                }}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
