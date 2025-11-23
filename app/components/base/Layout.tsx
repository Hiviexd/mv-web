import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "./Header";
import { Footer } from "./Footer";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [mobileHeaderOpened, { toggle: toggleMobileHeader }] = useDisclosure(false);
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !mobileHeaderOpened } }}
            footer={{ height: 60 }}
            padding="md">
            <Header mobileHeaderOpened={mobileHeaderOpened} toggleMobileHeader={toggleMobileHeader} />
            <MobileNavbar opened={mobileHeaderOpened} />

            <AppShell.Main className="main-layout">{children}</AppShell.Main>
        </AppShell>
    );
}
