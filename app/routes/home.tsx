import type { Route } from "./+types/home";
import { HeroSection } from "../components/home/HeroSection";
import { HomeSection } from "../components/home/HomeSection";
import { ChecksSection } from "../components/home/ChecksSection";
import { ComparisonSection } from "../components/home/ComparisonSection";
import { DownloadCtaSection } from "../components/home/DownloadCtaSection";
import { HomeFooter } from "../components/home/HomeFooter";
import { Stack } from "@mantine/core";

const homeSections = [
    {
        title: "Automatic Snapshots",
        description:
            "Automatically track mapset beatmap changes over time. Browse snapshot history and see exactly what was added, removed, or modified.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Snapshots+Screenshot",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Up to Date with Ranking Criteria",
        description:
            "Every check is updated to match current Ranking Criteria, from metadata and timing to mode-specific rules.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Checks+Tab+Screenshot",
        inverse: true,
    },
    {
        title: "Rich Documentation",
        description:
            "Built-in documentation explains each check: what it looks for, and why it matters. Browse the full checks reference without leaving the app.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Documentation+Screenshot",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Complete Overview",
        description:
            "One place to understand your entire mapset — metadata, objects, settings, difficulty curves, and audio quality.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Overview+Screenshot",
        inverse: true,
    },
    {
        title: "Objects Overview",
        description:
            "See every snap divisor and unsnapped object across all difficulties, plus an interactive timeline to compare patterns side by side.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Objects+Overview+Screenshot",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Difficulty Overview",
        description:
            "Interactive charts for star rating, slider velocity, and skill strain for all modes, with drag-to-zoom.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Difficulty+Overview+Screenshot",
        inverse: true,
    },
    {
        title: "Audio Overview",
        description:
            "Inspect audio format, ranking compliance, and a visual spectrogram — all without leaving Mapset Verifier.",
        imageSrc: "https://placehold.co/800x500/1a2332/62a0ff?text=Audio+Overview+Screenshot",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
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
            <HomeFooter />
        </Stack>
    );
}
