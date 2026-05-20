import { Box, Center, Text, Title } from "@mantine/core";
import { Logo } from "../base/Logo";

type HeroLogoSize = "default" | "small";

interface HeroLogoProps {
    size?: HeroLogoSize;
}

export function HeroLogo({ size = "default" }: HeroLogoProps) {
    const isSmall = size === "small";

    return (
        <Center w="100%">
            <Box className={`hero-logo${isSmall ? " hero-logo--small" : ""}`}>
                <Logo width={70} height={70} />
                {isSmall ? (
                    <Text component="h1" fz="2.5rem" fw={700} lh={1.05} c="primary.2" className="hero-logo__title">
                        Mapset
                        <br />
                        Verifier
                    </Text>
                ) : (
                    <Title order={1} size="3.5rem" c="primary.2" className="hero-logo__title">
                        Mapset Verifier
                    </Title>
                )}
            </Box>
        </Center>
    );
}
