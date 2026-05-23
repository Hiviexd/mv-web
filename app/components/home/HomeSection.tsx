import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { getMediaAspectRatio } from "../../lib/mediaDimensions";

interface HomeSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt?: string;
    inverse?: boolean;
    backgroundColor?: string;
}

function SectionText({ title, description }: Pick<HomeSectionProps, "title" | "description">) {
    return (
        <Stack flex={1} gap="md" justify="center">
            <Title order={2} c="primary.2">
                {title}
            </Title>
            <Text size="lg" c="dimmed">
                {description}
            </Text>
        </Stack>
    );
}

function isVideoSrc(src: string) {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(src);
}

function SectionMedia({ src, alt }: { src: string; alt: string }) {
    if (isVideoSrc(src)) {
        return (
            <video
                className="home-section__media"
                src={src}
                loop
                muted
                playsInline
                autoPlay
                aria-label={alt}
            />
        );
    }

    return <img className="home-section__media" src={src} alt={alt} />;
}

function mediaContainerStyle(src: string) {
    const aspectRatio = getMediaAspectRatio(src);
    return aspectRatio ? { aspectRatio } : undefined;
}

function SectionImage({ imageSrc, imageAlt }: Pick<HomeSectionProps, "imageSrc" | "imageAlt">) {
    return (
        <Card className="home-section__image" p="0" radius="md" style={mediaContainerStyle(imageSrc)}>
            <SectionMedia src={imageSrc} alt={imageAlt ?? ""} />
        </Card>
    );
}

export function HomeSection({
    title,
    description,
    imageSrc,
    imageAlt,
    inverse = false,
    backgroundColor,
}: HomeSectionProps) {
    const text = <SectionText title={title} description={description} />;
    const image = <SectionImage imageSrc={imageSrc} imageAlt={imageAlt ?? title} />;

    return (
        <section className="home-section" style={backgroundColor ? { backgroundColor } : undefined}>
            <Group
                className="home-section__layout"
                visibleFrom="md"
                align="center"
                gap="xl"
                wrap="nowrap"
            >
                {inverse ? (
                    <>
                        {image}
                        {text}
                    </>
                ) : (
                    <>
                        {text}
                        {image}
                    </>
                )}
            </Group>

            <Stack className="home-section__layout" hiddenFrom="md" gap="xl" align="center">
                {text}
                <Card className="home-section__image" p="0" style={mediaContainerStyle(imageSrc)}>
                    <SectionMedia src={imageSrc} alt={imageAlt ?? title} />
                </Card>
            </Stack>
        </section>
    );
}
