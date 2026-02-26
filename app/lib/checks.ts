import checksMetadata from "../data/checks-metadata.json";

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

export const severityOrder = ["Problem", "Warning", "Minor"] as const;

const slugify = (value: string) => {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();
};

const normalizeMarkdown = (value?: string) => {
    if (!value) {
        return undefined;
    }

    return value.replace(/\r\n/g, "\n").replace(/\n\s+/g, "\n").trim();
};

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
        .sort(
            (a, b) =>
                severityOrder.indexOf(a.level as (typeof severityOrder)[number]) -
                severityOrder.indexOf(b.level as (typeof severityOrder)[number])
        );

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
