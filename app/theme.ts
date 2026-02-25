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
    "#c5cad3",
    "#a3adbd",
    "#8695ab",
    "#363f50",
    "#2d3544",
    "#232b38",
    "#1c232e",
    "#161d28",
    "#0f141c",
    "#080b0f",
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
