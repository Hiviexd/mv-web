import { Box, Button, type ButtonProps } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";

type SearchButtonProps = ButtonProps & {
    text?: string;
    isMobile?: boolean;
    onOpen?: () => void;
};

export function SearchButton({ text, isMobile, onOpen, ...props }: SearchButtonProps) {
    const os = useOs();
    const shortcut = os === "macos" ? "⌘" : "Ctrl";

    const handleOpen = () => {
        onOpen?.();
        spotlight.open();
    };

    return (
        <Button
            variant="light"
            color="primary.2"
            fw={400}
            leftSection={<IconSearch size={16} stroke={1.5} />}
            rightSection={
                <Box
                    component="span"
                    px={6}
                    py={2}
                    fz={11}
                    lh={1}
                    fw={600}
                    c="inherit"
                    style={{
                        borderRadius: "var(--mantine-radius-sm)",
                        backgroundColor: "var(--mantine-color-body)",
                    }}>
                    {shortcut} + K
                </Box>
            }
            onClick={handleOpen}
            fullWidth={isMobile}
            miw={isMobile ? undefined : 220}
            aria-label="Search checks"
            styles={{
                inner: {
                    justifyContent: "space-between",
                },
                section: {
                    "&[data-position='right']": {
                        marginInlineStart: "auto",
                    },
                },
            }}
            {...props}>
            {text || "Search checks..."}
        </Button>
    );
}
