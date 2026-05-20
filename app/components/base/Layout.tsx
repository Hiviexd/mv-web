import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CheckSpotlight } from "../spotlight/CheckSpotlight";
import { Header } from "./Header";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [mobileHeaderOpened, { toggle: toggleMobileHeader }] = useDisclosure(false);
    return (
        <>
            <CheckSpotlight />
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !mobileHeaderOpened } }}
                padding="md">
                <Header mobileHeaderOpened={mobileHeaderOpened} toggleMobileHeader={toggleMobileHeader} />
                <MobileNavbar opened={mobileHeaderOpened} onClose={toggleMobileHeader} />

                <AppShell.Main className="main-layout">{children}</AppShell.Main>
            </AppShell>
        </>
    );
}
