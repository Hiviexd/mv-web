import { createTheme, Tooltip, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
    "#e1f8ff",
    "#cbedff",
    "#99ccff", // Main color
    "#64c1ff",
    "#3aaefe",
    "#20a2fe",
    "#099cff",
    "#0088e4",
    "#0079cd",
    "#0068b6",
] as const;

const dark: MantineColorsTuple = [
    "#A5B6CC",
    "#8FA0BA",
    "#6C809D",
    "#566A84",
    "#3E4E63",
    "#354356",
    "#283443",
    "#202A36",
    "#19212C",
    "#10161D",
] as const;

export const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    primaryColor: "primary",
    white: "#f8f9fa",
    black: "#212529",

    colors: {
        primary,
        dark,
    },

    components: {
        ActionIcon: {
            styles: {
                root: {
                    transition: "all 0.15s ease",
                },
            },
        },
        Button: {
            styles: {
                root: {
                    transition: "all 0.15s ease",
                },
            },
        },
        Mark: {
            styles: {
                root: {
                    borderRadius: "0.25rem",
                    padding: "0 0.5rem",
                },
            },
        },
        Tooltip: {
            defaultProps: {
                withArrow: true,
                arrowSize: 8,
                events: { hover: true, focus: true, touch: true },
            },
        },
    },
});
