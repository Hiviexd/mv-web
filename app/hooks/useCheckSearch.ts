import { useMemo } from "react";
import { allChecks, checkMatchesSearch, type CategoryGroup, type CheckEntry } from "../lib/checks";

const MAX_RESULTS = 50;

export function searchChecks(query: string): CheckEntry[] {
    const q = query.trim();
    if (!q) {
        return [];
    }

    return allChecks.filter((check) => checkMatchesSearch(check, q)).slice(0, MAX_RESULTS);
}

export function groupChecksByCategory(checks: CheckEntry[]): CategoryGroup[] {
    const map = new Map<string, CheckEntry[]>();

    for (const check of checks) {
        const existing = map.get(check.category) ?? [];
        existing.push(check);
        map.set(check.category, existing);
    }

    return Array.from(map.entries())
        .map(([category, categoryChecks]) => ({
            category,
            checks: categoryChecks.sort((a, b) => a.message.localeCompare(b.message)),
        }))
        .sort((a, b) => a.category.localeCompare(b.category));
}

export function useCheckSearch(query: string) {
    const checks = useMemo(() => searchChecks(query), [query]);
    const groups = useMemo(() => groupChecksByCategory(checks), [checks]);

    return { checks, groups, resultCount: checks.length };
}
