import checksMetadata from "../data/checks-metadata.json";
import { normalizeMarkdown, slugify } from "./utils";

type TemplateEntry = {
    level?: string;
    formatString?: string;
    defaultArguments?: string[];
    cause?: string;
};

export interface CheckTemplate {
    key: string;
    level: string;
    formatString: string;
    defaultArguments: string[];
    cause?: string;
}

export interface CheckDocumentation {
    purpose?: string;
    reasoning?: string;
}

export interface CheckEntry {
    name: string;
    slug: string;
    fullName: string;
    message: string;
    category: string;
    checkType: string;
    author?: string;
    modes?: string[];
    difficulties?: string[];
    documentation: CheckDocumentation;
    templates: CheckTemplate[];
}

export interface CategoryGroup {
    category: string;
    checks: CheckEntry[];
}

export const checkLevels = ["Problem", "Warning", "Minor", "Error", "Info"] as const;
export type CheckLevel = (typeof checkLevels)[number];
export const severityOrder = checkLevels;

export function getCheckLevelSortIndex(level: string) {
    const index = checkLevels.indexOf(level as CheckLevel);
    return index === -1 ? checkLevels.length : index;
}

export function sortTemplatesBySeverity<T extends { level: string }>(templates: T[]) {
    return [...templates].sort((a, b) => getCheckLevelSortIndex(a.level) - getCheckLevelSortIndex(b.level));
}

export function getCheckPath(slug: string) {
    return `/checks/${slug}`;
}

export const allChecks: CheckEntry[] = checksMetadata.checks.map((check) => {
    const templates = Object.entries(check.templates ?? {})
        .flatMap(([key, template]) => {
            if (!template) {
                return [];
            }

            return [
                {
                    key,
                    level: template.level ?? "Warning",
                    formatString: template.formatString ?? "",
                    defaultArguments: template.defaultArguments ?? [],
                    cause: template.cause,
                } satisfies CheckTemplate,
            ];
        })
        .sort((a, b) => getCheckLevelSortIndex(a.level) - getCheckLevelSortIndex(b.level));

    return {
        name: check.name,
        slug: slugify(check.name),
        fullName: check.fullName,
        message: check.message,
        category: check.category,
        checkType: check.checkType,
        author: check.author,
        modes: check.modes,
        difficulties: check.difficulties,
        documentation: {
            purpose: normalizeMarkdown(check.documentation?.Purpose),
            reasoning: normalizeMarkdown(check.documentation?.Reasoning),
        },
        templates,
    } satisfies CheckEntry;
});

export const categoryGroups: CategoryGroup[] = Array.from(
    allChecks.reduce((map, check) => {
        const existing = map.get(check.category) ?? [];
        existing.push(check);
        map.set(check.category, existing);
        return map;
    }, new Map<string, CheckEntry[]>())
)
    .map(([category, checks]) => ({
        category,
        checks: checks.sort((a, b) => a.message.localeCompare(b.message)),
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

export const getCheckBySlug = (slug: string) => allChecks.find((check) => check.slug === slug);

export const getCategoryGroup = (category: string) => categoryGroups.find((group) => group.category === category);

export const getPrevNextInCategory = (slug: string) => {
    const check = getCheckBySlug(slug);
    if (!check) {
        return { previous: undefined, next: undefined } as const;
    }

    const group = getCategoryGroup(check.category);
    if (!group) {
        return { previous: undefined, next: undefined } as const;
    }

    const index = group.checks.findIndex((entry) => entry.slug === slug);

    return {
        previous: index > 0 ? group.checks[index - 1] : undefined,
        next: index >= 0 && index < group.checks.length - 1 ? group.checks[index + 1] : undefined,
    } as const;
};

export const getCheckLevels = (check: CheckEntry) => {
    const levels = new Set<string>();

    check.templates.forEach((template) => {
        if (template.level) {
            levels.add(template.level);
        }
    });

    return severityOrder.filter((level) => levels.has(level));
};

export function checkMatchesSearch(check: CheckEntry, query: string) {
    const q = query.trim().toLowerCase();
    if (!q) {
        return true;
    }

    return (
        check.message.toLowerCase().includes(q) ||
        check.name.toLowerCase().includes(q) ||
        check.slug.toLowerCase().includes(q) ||
        check.fullName.toLowerCase().includes(q) ||
        check.category.toLowerCase().includes(q) ||
        check.author?.toLowerCase().includes(q) ||
        check.modes?.some((mode) => mode.toLowerCase().includes(q))
    );
}

export function filterCategoryGroups(groups: CategoryGroup[], query: string) {
    const q = query.trim();
    if (!q) {
        return groups;
    }

    return groups
        .map((group) => ({
            ...group,
            checks: group.checks.filter((check) => checkMatchesSearch(check, q)),
        }))
        .filter((group) => group.checks.length > 0);
}
