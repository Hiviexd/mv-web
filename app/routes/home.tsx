import type { Route } from "./+types/home";
import { createPageMeta } from "../lib/seo";
import { HeroSection } from "../components/home/HeroSection";
import { HomeSection } from "../components/home/HomeSection";
import { ChecksSection } from "../components/home/ChecksSection";
import { ComparisonSection } from "../components/home/ComparisonSection";
import { DownloadCtaSection } from "../components/home/DownloadCtaSection";
import { HomeFooter } from "../components/home/HomeFooter";
import { HomeSkeleton } from "../components/home/HomeSkeleton";
import { Stack } from "@mantine/core";

const homeSections = [
    {
        title: "Automatic Snapshots",
        description:
            "Automatically track mapset beatmap changes over time. Browse snapshot history and see exactly what was added, removed, or modified.",
        imageSrc: "/assets/home/snapshots.mp4",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Up to Date with Ranking Criteria",
        description:
            "Every check is updated to match current Ranking Criteria, from metadata and timing to mode-specific rules.",
        imageSrc: "/assets/home/checks.mp4",
        inverse: true,
    },
    {
        title: "Rich Documentation",
        description:
            "Built-in documentation explains each check: what it looks for, and why it matters. Browse the full checks reference without leaving the app.",
        imageSrc: "/assets/home/documentation.mp4",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Complete Overview",
        description:
            "One place to understand your entire mapset — metadata, objects, settings, difficulty curves, and audio quality.",
        imageSrc: "/assets/home/overview.mp4",
        inverse: true,
    },
    {
        title: "Objects Overview",
        description:
            "See every snap divisor and unsnapped object across all difficulties, plus an interactive timeline to compare patterns side by side.",
        imageSrc: "/assets/home/objects-overview.mp4",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
    {
        title: "Difficulty Overview",
        description:
            "Interactive charts for star rating, slider velocity, and skill strain for all modes, with drag-to-zoom.",
        imageSrc: "/assets/home/difficulty-overview.mp4",
        inverse: true,
    },
    {
        title: "Audio Overview",
        description:
            "Inspect audio format, ranking compliance, and a visual spectrogram — all without leaving Mapset Verifier.",
        imageSrc: "/assets/home/audio-overview.png",
        inverse: false,
        backgroundColor: "var(--mantine-color-dark-8)",
    },
] as const;

export function meta({}: Route.MetaArgs) {
    return createPageMeta({
        title: "Mapset Verifier | Automated Quality Assurance for osu! Beatmaps",
        ogTitle: "Mapset Verifier",
        description: "Automated Quality Assurance for osu! Beatmaps. Catch issues before they become problems.",
        isHome: true,
    });
}

export function HydrateFallback() {
    return <HomeSkeleton />;
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
