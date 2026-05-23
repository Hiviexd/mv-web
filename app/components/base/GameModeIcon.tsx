import { Tooltip } from "@mantine/core";

// --- Data: game mode icons (data URIs) ---
const OSU_ICON =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='LOGO_LAYER' data-name='LOGO LAYER' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fff; stroke-width: 0px; %7D %3C/style%3E%3C/defs%3E%3Cg%3E%3Ccircle class='cls-1' cx='250' cy='250' r='130'/%3E%3Cpath class='cls-1' d='m250,140c29.38,0,57.01,11.44,77.78,32.22,20.78,20.78,32.22,48.4,32.22,77.78s-11.44,57.01-32.22,77.78c-20.78,20.78-48.4,32.22-77.78,32.22s-57.01-11.44-77.78-32.22c-20.78-20.78-32.22-48.4-32.22-77.78s11.44-57.01,32.22-77.78c20.78-20.78,48.4-32.22,77.78-32.22m0-40c-82.84,0-150,67.16-150,150s67.16,150,150,150,150-67.16,150-150-67.16-150-150-150h0Z'/%3E%3C/g%3E%3Cpath class='cls-1' d='m250,55c107.7,0,195,87.3,195,195s-87.3,195-195,195S55,357.7,55,250,142.3,55,250,55m0-40c-31.71,0-62.49,6.22-91.48,18.48-27.99,11.84-53.12,28.78-74.69,50.35-21.57,21.57-38.51,46.7-50.35,74.68-12.27,29-18.48,59.78-18.48,91.48s6.22,62.49,18.48,91.48c11.84,27.99,28.78,53.12,50.35,74.69,21.57,21.57,46.7,38.51,74.69,50.35,29,12.26,59.78,18.48,91.48,18.48s62.49-6.22,91.48-18.48c27.99-11.84,53.12-28.78,74.69-50.35,21.57-21.57,38.51-46.7,50.35-74.69,12.26-29,18.48-59.78,18.48-91.48s-6.22-62.49-18.48-91.48c-11.84-27.99-28.78-53.12-50.35-74.68-21.57-21.57-46.7-38.51-74.69-50.35-29-12.27-59.78-18.48-91.48-18.48h0Z'/%3E%3C/svg%3E";
const TAIKO_ICON =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='LOGO_LAYER' data-name='LOGO LAYER' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: none; %7D .cls-1, .cls-2 %7B stroke-width: 0px; %7D .cls-2 %7B fill: %23fff; %7D %3C/style%3E%3C/defs%3E%3Cg%3E%3Cpath class='cls-1' d='m225,153.16c-43.08,11.13-75,50.33-75,96.84s31.92,85.71,75,96.84v-193.67Z'/%3E%3Cpath class='cls-1' d='m275,153.16v193.67c43.08-11.13,75-50.32,75-96.84s-31.92-85.71-75-96.84Z'/%3E%3Cpath class='cls-2' d='m250,100c-82.84,0-150,67.16-150,150s67.16,150,150,150,150-67.16,150-150-67.16-150-150-150Zm-100,150c0-46.51,31.92-85.71,75-96.84v193.67c-43.08-11.13-75-50.32-75-96.84Zm125,96.84v-193.67c43.08,11.13,75,50.33,75,96.84s-31.92,85.71-75,96.84Z'/%3E%3C/g%3E%3Cpath class='cls-2' d='m250,55c107.7,0,195,87.3,195,195s-87.3,195-195,195S55,357.7,55,250,142.3,55,250,55m0-40c-31.71,0-62.49,6.22-91.48,18.48-27.99,11.84-53.12,28.78-74.69,50.35-21.57,21.57-38.51,46.7-50.35,74.68-12.27,29-18.48,59.78-18.48,91.48s6.22,62.49,18.48,91.48c11.84,27.99,28.78,53.12,50.35,74.69,21.57,21.57,46.7,38.51,74.69,50.35,29,12.26,59.78,18.48,91.48,18.48s62.49-6.22,91.48-18.48c27.99-11.84,53.12-28.78,74.69-50.35,21.57-21.57,38.51-46.7,50.35-74.69,12.26-29,18.48-59.78,18.48-91.48s-6.22-62.49-18.48-91.48c-11.84-27.99-28.78-53.12-50.35-74.68-21.57-21.57-46.7-38.51-74.69-50.35-29-12.27-59.78-18.48-91.48-18.48h0Z'/%3E%3C/svg%3E";
const CATCH_ICON =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='LOGO_LAYER' data-name='LOGO LAYER' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fff; stroke-width: 0px; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='m250,55c107.7,0,195,87.3,195,195s-87.3,195-195,195S55,357.7,55,250,142.3,55,250,55m0-40c-31.71,0-62.49,6.22-91.48,18.48-27.99,11.84-53.12,28.78-74.69,50.35-21.57,21.57-38.51,46.7-50.35,74.68-12.27,29-18.48,59.78-18.48,91.48s6.22,62.49,18.48,91.48c11.84,27.99,28.78,53.12,50.35,74.69,21.57,21.57,46.7,38.51,74.69,50.35,29,12.26,59.78,18.48,91.48,18.48s62.49-6.22,91.48-18.48c27.99-11.84,53.12-28.78,74.69-50.35,21.57-21.57,38.51-46.7,50.35-74.69,12.26-29,18.48-59.78,18.48-91.48s-6.22-62.49-18.48-91.48c-11.84-27.99-28.78-53.12-50.35-74.68-21.57-21.57-46.7-38.51-74.69-50.35-29-12.27-59.78-18.48-91.48-18.48h0Z'/%3E%3Cg%3E%3Ccircle class='cls-1' cx='308.75' cy='250' r='37.5'/%3E%3Ccircle class='cls-1' cx='221.25' cy='173.75' r='37.5'/%3E%3Ccircle class='cls-1' cx='221.25' cy='326.25' r='37.5'/%3E%3C/g%3E%3C/svg%3E";
const MANIA_ICON =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='LOGO_LAYER' data-name='LOGO LAYER' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23fff; stroke-width: 0px; %7D %3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='m250,401c-13.81,0-25-11.19-25-25V124c0-13.81,11.19-25,25-25s25,11.19,25,25v252c0,13.81-11.19,25-25,25Z'/%3E%3Cpath class='cls-1' d='m170,330c-13.81,0-25-11.19-25-25v-110c0-13.81,11.19-25,25-25s25,11.19,25,25v110c0,13.81-11.19,25-25,25Z'/%3E%3Cpath class='cls-1' d='m330,330c-13.81,0-25-11.19-25-25v-110c0-13.81,11.19-25,25-25s25,11.19,25,25v110c0,13.81-11.19,25-25,25Z'/%3E%3Cpath class='cls-1' d='m250,55c107.7,0,195,87.3,195,195s-87.3,195-195,195S55,357.7,55,250,142.3,55,250,55m0-40c-31.71,0-62.49,6.22-91.48,18.48-27.99,11.84-53.12,28.78-74.69,50.35-21.57,21.57-38.51,46.7-50.35,74.68-12.27,29-18.48,59.78-18.48,91.48s6.22,62.49,18.48,91.48c11.84,27.99,28.78,53.12,50.35,74.69,21.57,21.57,46.7,38.51,74.69,50.35,29,12.26,59.78,18.48,91.48,18.48s62.49-6.22,91.48-18.48c27.99-11.84,53.12-28.78,74.69-50.35,21.57-21.57,38.51-46.7,50.35-74.69,12.26-29,18.48-59.78,18.48-91.48s-6.22-62.49-18.48-91.48c-11.84-27.99-28.78-53.12-50.35-74.68-21.57-21.57-46.7-38.51-74.69-50.35-29-12.27-59.78-18.48-91.48-18.48h0Z'/%3E%3C/svg%3E";

// --- Data structures ---
export type GameMode = "osu" | "taiko" | "catch" | "mania";
export type Difficulty = "easy" | "normal" | "hard" | "insane" | "expert" | "ultra";

export const GAME_MODES: Record<GameMode, { icon: string; label: string }> = {
    osu: { icon: OSU_ICON, label: "osu!" },
    taiko: { icon: TAIKO_ICON, label: "osu!taiko" },
    catch: { icon: CATCH_ICON, label: "osu!catch" },
    mania: { icon: MANIA_ICON, label: "osu!mania" },
};

export const DIFFICULTIES: Record<Difficulty, { color: string; label: string }> = {
    easy: { color: "#4febe5", label: "Easy" },
    normal: { color: "#75ff76", label: "Normal" },
    hard: { color: "#f7ea5d", label: "Hard" },
    insane: { color: "#ff7e68", label: "Insane" },
    expert: { color: "#ff4370", label: "Expert" },
    ultra: { color: "#6563de", label: "Ultra" },
};

const MODE_DIFFICULTY_LABELS: Record<GameMode, Record<Difficulty, string>> = {
    osu: {
        easy: "Easy",
        normal: "Normal",
        hard: "Hard",
        insane: "Insane",
        expert: "Expert",
        ultra: "Ultra",
    },
    mania: {
        easy: "Easy",
        normal: "Normal",
        hard: "Hard",
        insane: "Insane",
        expert: "Expert",
        ultra: "Ultra",
    },
    taiko: {
        easy: "Kantan",
        normal: "Futsuu",
        hard: "Muzukashii",
        insane: "Oni",
        expert: "Inner Oni",
        ultra: "Hell Oni",
    },
    catch: {
        easy: "Cup",
        normal: "Salad",
        hard: "Platter",
        insane: "Rain",
        expert: "Overdose",
        ultra: "Deluge",
    },
};

const DEFAULT_ICON_COLOR = "#fff";

/** Replaces the white fill in the SVG data URI with the given hex color. */
function withFillColor(dataUri: string, hexColor: string): string {
    const encoded = "%23" + hexColor.slice(1).toLowerCase();
    return dataUri.replace(/%23fff/gi, encoded);
}

/** Normalizes a mode string to a GameMode enum value. */
export function normalizeMode(rawMode: string): GameMode {
    const s = rawMode.trim().toLowerCase();

    // Numeric mode IDs (e.g. from .osu files)
    if (s === "0") return "osu";
    if (s === "1") return "taiko";
    if (s === "2") return "catch";
    if (s === "3") return "mania";
    // Canonical keys
    if (s === "osu" || s === "standard" || s === "std") return "osu";
    if (s === "taiko") return "taiko";
    if (s === "catch" || s === "ctb" || s === "fruits") return "catch";
    if (s === "mania") return "mania";
    // Fallback for unknown values
    return "osu";
}

/** Resolves a difficulty string to a Difficulty tier. */
function resolveDifficultyTier(rawDifficulty: string): Difficulty {
    const s = rawDifficulty.trim().toLowerCase();

    // Canonical keys (osu! / mania)
    if (s === "easy") return "easy";
    if (s === "normal") return "normal";
    if (s === "hard") return "hard";
    if (s === "insane") return "insane";
    if (s === "expert") return "expert";
    if (s === "ultra") return "ultra";
    // Taiko
    if (s === "kantan") return "easy";
    if (s === "futsuu") return "normal";
    if (s === "muzukashii") return "hard";
    if (s === "oni") return "insane";
    if (s === "inner oni") return "expert";
    if (s === "hell oni") return "ultra";
    // Catch
    if (s === "cup") return "easy";
    if (s === "salad") return "normal";
    if (s === "platter") return "hard";
    if (s === "rain") return "insane";
    if (s === "overdose") return "expert";
    if (s === "deluge") return "ultra";
    // Fallback for unknown values
    return "normal";
}

/** Normalizes a difficulty string to the mode-appropriate difficulty name. */
export function normalizeDifficulty(rawMode: string, rawDifficulty: string): string {
    const mode = normalizeMode(rawMode);
    const tier = resolveDifficultyTier(rawDifficulty);
    return MODE_DIFFICULTY_LABELS[mode][tier];
}

export interface GameModeIconProps {
    mode?: string;
    difficulty?: string;
    size?: number;
}

export function GameModeIcon({ mode, difficulty, size = 20 }: GameModeIconProps) {
    const normalizedMode = normalizeMode(mode ?? "osu");
    const difficultyTier = difficulty ? resolveDifficultyTier(difficulty) : undefined;
    const difficultyLabel = difficulty ? normalizeDifficulty(normalizedMode, difficulty) : undefined;

    const { icon, label: modeLabel } = GAME_MODES[normalizedMode];
    const color = difficultyTier ? DIFFICULTIES[difficultyTier].color : DEFAULT_ICON_COLOR;
    const tooltipLabel = difficultyLabel ?? modeLabel;
    const src = color === DEFAULT_ICON_COLOR ? icon : withFillColor(icon, color);

    return (
        <Tooltip label={tooltipLabel} position="top">
            <img
                src={src}
                alt={tooltipLabel}
                width={size}
                height={size}
                style={{ display: "block", verticalAlign: "middle" }}
            />
        </Tooltip>
    );
}
