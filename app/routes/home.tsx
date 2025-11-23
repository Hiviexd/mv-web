import type { Route } from "./+types/home";
import { Layout } from "../components/base/Layout";
import { HeroSection } from "../components/home/HeroSection";
import { FeatureSection } from "../components/home/FeatureSection";
import { ChecksSection } from "../components/home/ChecksSection";
import { ComparisonSection } from "../components/home/ComparisonSection";
import { Stack } from "@mantine/core";

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
        <Layout>
            <Stack gap="xl">
                <HeroSection />
                <ChecksSection />
                <ComparisonSection />
            </Stack>
        </Layout>
    );
}
