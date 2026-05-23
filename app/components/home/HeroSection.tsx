import { Card, Group, Stack, Text } from "@mantine/core";
import { getMediaAspectRatio } from "../../lib/mediaDimensions";
import DownloadButton from "./DownloadButton";
import { HeroLogo } from "./HeroLogo";

const showcaseSrc = "/assets/home/showcase.mp4";

function HeroContent({ layout }: { layout: "desktop" | "mobile" }) {
    const isDesktop = layout === "desktop";

    return (
        <Stack flex={isDesktop ? 1 : undefined} w="100%" gap="xl" align="center">
            <HeroLogo size={isDesktop ? "default" : "small"} />
            <Stack gap="lg" align="center" w="100%" px={isDesktop ? undefined : "md"}>
                <Text
                    className={`hero__tagline${isDesktop ? " hero__tagline--nowrap" : ""}`}
                    size="lg"
                    ta="center"
                >
                    The #1 osu! modding tool. Catch issues before they become problems.
                </Text>
                <DownloadButton />
            </Stack>
        </Stack>
    );
}

function HeroVideo({ maw }: { maw: string | number }) {
    const aspectRatio = getMediaAspectRatio(showcaseSrc);

    return (
        <Card
            className="hero__video"
            maw={maw}
            w="100%"
            p="0"
            radius="md"
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            <video
                className="hero__media"
                src={showcaseSrc}
                loop
                muted
                playsInline
                autoPlay
                aria-label="Mapset Verifier"
            />
        </Card>
    );
}

export function HeroSection() {
    return (
        <>
            <Group className="hero" visibleFrom="md" align="center" gap="xl" mih="60vh" wrap="nowrap">
                <HeroContent layout="desktop" />
                <HeroVideo maw="50%" />
            </Group>

            <Stack className="hero" hiddenFrom="md" w="100%" gap="xl" align="center" mih="60vh" pt="xl">
                <HeroContent layout="mobile" />
                <HeroVideo maw="28rem" />
            </Stack>
        </>
    );
}
