import { Box } from "@mantine/core";
import logo from "../../assets/logo.svg";

interface LogoProps {
    width?: number | string;
    height?: number | string;
    glow?: boolean;
}

export function Logo({ width = 40, height = 40, glow = false }: LogoProps) {
    return (
        <Box mod={[{ glow: glow }]} className="logo">
            <img src={logo} alt="Mapset Verifier" width={width} height={height} style={{ display: "block" }} />
        </Box>
    );
}
