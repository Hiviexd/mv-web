import { useState } from "react";
import { FocusTrap, Group, Kbd, Stack, Text } from "@mantine/core";
import { Spotlight as MantineSpotlight } from "@mantine/spotlight";
import { useDebouncedValue } from "@mantine/hooks";
import { IconArrowDown, IconArrowUp, IconCornerDownLeft, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { CheckEntry } from "../../lib/checks";
import { getCheckPath } from "../../lib/checks";
import { useCheckSearch } from "../../hooks/useCheckSearch";
import { CheckSpotlightAction } from "./CheckSpotlightAction";

const SEARCH_DEBOUNCE_MS = 200;

export function CheckSpotlight() {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
    const { groups } = useCheckSearch(debouncedSearch);
    const navigate = useNavigate();

    const handleSelect = (check: CheckEntry) => {
        setSearch("");
        navigate(getCheckPath(check.slug));
    };

    const hasQuery = debouncedSearch.trim().length > 0;
    const hasResults = groups.length > 0;

    return (
        <MantineSpotlight.Root scrollable maxHeight="500px" lockScroll={false}>
            <FocusTrap active>
                <MantineSpotlight.Search
                    placeholder="Search checks by name, category, author, or mode..."
                    leftSection={<IconSearch size={16} stroke={1.5} />}
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
            </FocusTrap>
            <MantineSpotlight.ActionsList>
                {hasResults &&
                    groups.map((group) => (
                        <MantineSpotlight.ActionsGroup key={group.category} label={group.category}>
                            {group.checks.map((check) => (
                                <CheckSpotlightAction
                                    key={check.slug}
                                    check={check}
                                    onClick={() => handleSelect(check)}
                                />
                            ))}
                        </MantineSpotlight.ActionsGroup>
                    ))}
                <MantineSpotlight.Empty>
                    {hasQuery && !hasResults ? (
                        <Text>No checks found.</Text>
                    ) : (
                        <Stack gap="sm" align="center">
                            <Group gap="lg">
                                <Text size="sm">
                                    <Kbd size="xs">
                                        <IconArrowUp size={12} />
                                    </Kbd>{" "}
                                    <Kbd size="xs">
                                        <IconArrowDown size={12} />
                                    </Kbd>{" "}
                                    to navigate
                                </Text>
                                <Text size="sm">
                                    <Kbd size="xs">
                                        <IconCornerDownLeft size={12} />
                                    </Kbd>{" "}
                                    to select
                                </Text>
                                <Text size="sm">
                                    <Kbd size="xs">Esc</Kbd> to close
                                </Text>
                            </Group>
                        </Stack>
                    )}
                </MantineSpotlight.Empty>
            </MantineSpotlight.ActionsList>
        </MantineSpotlight.Root>
    );
}
