import { Group } from "@mantine/core";
import { RepositoryActions } from "./RepositoryActions";
import { SearchButton } from "./SearchButton";

export function ActionIcons() {
    return (
        <Group gap="sm">
            <SearchButton />
            <RepositoryActions />
        </Group>
    );
}
