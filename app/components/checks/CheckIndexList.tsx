import { memo, useMemo, useState } from "react";
import { Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import type { CategoryGroup } from "../../lib/checks";
import { filterCategoryGroups } from "../../lib/checks";
import { slugify } from "../../lib/utils";
import { CheckSummaryCard } from "./CheckSummaryCard";

interface CheckIndexListProps {
    groups: CategoryGroup[];
}

interface CheckIndexSearchResultsProps {
    groups: CategoryGroup[];
    query: string;
}

const SEARCH_DEBOUNCE_MS = 200;

const CheckIndexSearchResults = memo(function CheckIndexSearchResults({
    groups,
    query,
}: CheckIndexSearchResultsProps) {
    const filteredGroups = useMemo(() => filterCategoryGroups(groups, query), [groups, query]);
    const resultCount = useMemo(
        () => filteredGroups.reduce((count, group) => count + group.checks.length, 0),
        [filteredGroups]
    );
    const trimmedQuery = query.trim();

    return (
        <>
            {trimmedQuery && (
                <Text size="sm" c="dimmed">
                    {resultCount} {resultCount === 1 ? "check" : "checks"} found
                </Text>
            )}

            {filteredGroups.length === 0 ? (
                <Text c="dimmed">No checks match &ldquo;{trimmedQuery}&rdquo;.</Text>
            ) : (
                filteredGroups.map((group) => (
                    <Stack key={group.category} gap="md" id={slugify(group.category)}>
                        <Group justify="space-between">
                            <Title order={2}>{group.category}</Title>
                            <Text size="xs" c="dimmed">
                                {group.checks.length} checks
                            </Text>
                        </Group>
                        <Stack gap="sm">
                            {group.checks.map((check) => (
                                <CheckSummaryCard key={check.slug} check={check} />
                            ))}
                        </Stack>
                    </Stack>
                ))
            )}
        </>
    );
});

export function CheckIndexList({ groups }: CheckIndexListProps) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

    return (
        <Stack gap="xl">
            <TextInput
                placeholder="Search by name, category, author, or mode..."
                leftSection={<IconSearch size={16} stroke={1.5} />}
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                aria-label="Search checks"
            />
            <CheckIndexSearchResults groups={groups} query={debouncedQuery} />
        </Stack>
    );
}
