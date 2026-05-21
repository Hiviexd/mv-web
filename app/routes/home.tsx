import type { Route } from "./+types/home";
import { HeroSection } from "../components/home/HeroSection";
import { HomeSection } from "../components/home/HomeSection";
import { ChecksSection } from "../components/home/ChecksSection";
import { ComparisonSection } from "../components/home/ComparisonSection";
import { DownloadCtaSection } from "../components/home/DownloadCtaSection";
import { Stack } from "@mantine/core";

const homeSections = [
    {
        title: "Automatic Snapshots",
        description:
            "Automatically track mapset changes over time. Browse snapshot history and see exactly what was added, removed, or modified — per difficulty or for the whole set.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Snapshots",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-7)",
    },
    {
        title: "Up to Date with Ranking Criteria",
        description:
            "Every check is updated to match current Ranking Criteria, from metadata and timing to mode-specific rules. Built-in documentation explains each issue, and star rating calculations match osu! lazer.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Ranking+Criteria",
        inverse: true,
    },
    {
        title: "Complete Overview",
        description:
            "One place to understand your entire mapset — metadata, objects, settings, difficulty curves, and audio quality.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Overview",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-7)",
    },
    {
        title: "Objects Overview",
        description:
            "See every snap divisor and unsnapped object across all difficulties, plus an interactive timeline to compare patterns side by side.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Objects+Overview",
        inverse: true,
    },
    {
        title: "Difficulty Overview",
        description:
            "Interactive charts for star rating, slider velocity, and skill strain — all modes, with drag-to-zoom.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Difficulty+Overview",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-7)",
    },
    {
        title: "Audio Overview",
        description:
            "Inspect audio format, ranking compliance, and a visual spectrogram — all without leaving Mapset Verifier.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Audio+Overview",
        inverse: true,
    },
] as const;

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Mapset Verifier - Automated Quality Assurance for osu! Beatmaps" },
        {
            name: "description",
            content: "Automated quality assurance tool for osu! beatmaps. Catch issues before they become problems.",
        },
    ];
}

export default function Home() {
    return (
        <Stack gap="xl">
            <HeroSection />
            <ChecksSection />
            {homeSections.map((section, index) => (
                <HomeSection key={section.title} {...section} />
            ))}
            <ComparisonSection />
            <DownloadCtaSection />
        </Stack>
    );
}
