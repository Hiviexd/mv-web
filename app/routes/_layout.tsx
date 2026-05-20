import { Outlet } from "react-router";
import { Layout } from "../components/base/Layout";

export default function SiteLayout() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
