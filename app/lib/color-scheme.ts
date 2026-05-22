import type { MantineColorSchemeManager } from "@mantine/core";

/** Always dark — avoids a one-frame light scheme flash from localStorage before forceColorScheme applies. */
export const forcedDarkColorSchemeManager: MantineColorSchemeManager = {
    get: () => "dark",
    set: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    clear: () => {},
};
