import { Stack, Title, Mark } from "@mantine/core";
import { useMemo } from "react";
import { Marquee } from "@gfazioli/mantine-marquee";
import { allChecks } from "../../lib/checks";
import { CheckCard } from "./checks/CheckCard";

export function ChecksSection() {
    const checks = allChecks;
    const totalChecks = checks.length;
    const shuffledChecks = useMemo(() => {
        return checks
            .map((check) => ({ check, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ check }) => check);
    }, [checks]);
    const marqueeChecks = shuffledChecks.slice(0, 24);
    const marqueeChecksReverse = marqueeChecks.slice().reverse();

    return (
        <Stack gap="xl" mb="xl">
            <Title order={1} ta="center" c="primary.2">
                A total of <Mark color="primary.2">{totalChecks}</Mark> unique beatmap checks
            </Title>
            <Stack gap="md">
                <Marquee w="100%" fadeEdges duration={120}>
                    {marqueeChecks.map((check) => (
                        <CheckCard key={check.slug} check={check} />
                    ))}
                </Marquee>
                <Marquee w="100%" fadeEdges reverse duration={120}>
                    {marqueeChecksReverse.map((check) => (
                        <CheckCard key={check.slug} check={check} />
                    ))}
                </Marquee>
            </Stack>
        </Stack>
    );
}
