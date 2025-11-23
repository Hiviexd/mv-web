import { AppShell } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, useMemo, useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
            <Header />
            <AppShell.Main className="main-layout">{children}</AppShell.Main>
            <Footer />
        </AppShell>
    );
}
