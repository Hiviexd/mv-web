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

/**
 --mantine-color-dark-0	#C9C9C9	
--mantine-color-dark-1	#b8b8b8	
--mantine-color-dark-2	#828282	
--mantine-color-dark-3	#696969	
--mantine-color-dark-4	#424242	
--mantine-color-dark-5	#3b3b3b	
--mantine-color-dark-6	#2e2e2e	
--mantine-color-dark-7	#242424	
--mantine-color-dark-8	#1f1f1f	
--mantine-color-dark-9	#141414
 */

const dark: MantineColorsTuple = [
    "#A5B6CC", // lightest (muted blue-gray)
    "#8FA0BA",
    "#6C809D",
    "#566A84",
    "#3E4E63",
    "#354356",
    "#283443",
    "#202A36",
    "#19212C",
    "#10161D", // darkest — pairs beautifully with #99ccff
] as const;

export const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    primaryColor: "primary",

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
        Tooltip: {
            defaultProps: {
                withArrow: true,
                arrowSize: 8,
                events: { hover: true, focus: true, touch: true },
            },
        },
    },
});
