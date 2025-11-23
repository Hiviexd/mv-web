import { createTheme, Tooltip, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
    "#e1f8ff",
    "#cbedff",
    "#99ccff",
    "#64c1ff",
    "#3aaefe",
    "#20a2fe",
    "#099cff",
    "#0088e4",
    "#0079cd",
    "#0068b6",
] as const;

export const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    primaryColor: "primary",

    colors: {
        primary,
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
        Tooltip: {
            defaultProps: {
                withArrow: true,
                arrowSize: 8,
                events: { hover: true, focus: true, touch: true },
            }
        },
    },
});
