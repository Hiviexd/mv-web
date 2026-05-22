import { Anchor, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { navigationLinks } from "../../config/navigation";
import metadata from "../../data/metadata.json";
import { Logo } from "../base/Logo";

const externalLinks = [
    { label: "MV Source Code", href: metadata.repository },
    { label: "Website Source Code", href: metadata.websiteRepository },
    { label: "Report Issues in MV", href: `${metadata.repository}/issues` },
] as const;

export function HomeFooter() {
    return (
        <footer className="home-footer">
            <div className="home-footer__inner">
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" verticalSpacing="xl">
                    <Stack gap="md" className="home-footer__column">
                        <Anchor
                            component={Link}
                            to="/"
                            underline="never"
                            aria-label="Mapset Verifier home"
                            w="fit-content"
                            className="home-footer__brand">
                            <Group gap="md" wrap="nowrap" w="fit-content">
                                <Logo width={48} height={48} />
                                <Title order={3} c="primary.2" className="home-footer__title" w="fit-content">
                                    Mapset Verifier
                                </Title>
                            </Group>
                        </Anchor>
                        <Text size="sm" c="dimmed" className="home-footer__maintainers">
                            Maintained by{" "}
                            <Anchor
                                href={metadata.greaperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                c="primary.2"
                                className="home-footer__link">
                                Greaper
                            </Anchor>{" "}
                            and{" "}
                            <Anchor
                                href={metadata.hivieLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                c="primary.2"
                                className="home-footer__link">
                                Hivie
                            </Anchor>
                        </Text>
                    </Stack>

                    <Stack gap="sm" align="flex-start" className="home-footer__column home-footer__links">
                        <Text size="sm" fw={600} c="dimmed" tt="uppercase" lts={0.04}>
                            Pages
                        </Text>
                        {navigationLinks.map((item) => (
                            <Anchor
                                key={item.href}
                                component={Link}
                                to={item.href}
                                size="sm"
                                c="primary.2"
                                className="home-footer__link">
                                {item.label}
                            </Anchor>
                        ))}
                    </Stack>

                    <Stack gap="sm" align="flex-start" className="home-footer__column home-footer__links">
                        <Text size="sm" fw={600} c="dimmed" tt="uppercase" lts={0.04}>
                            Resources
                        </Text>
                        {externalLinks.map((item) => (
                            <Anchor
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                c="primary.2"
                                className="home-footer__link">
                                {item.label}
                            </Anchor>
                        ))}
                    </Stack>
                </SimpleGrid>
            </div>
        </footer>
    );
}
