import logo from "../../assets/logo.svg";

interface LogoProps {
    width?: number | string;
    height?: number | string;
}

export function Logo({ width = 40, height = 40 }: LogoProps) {
    return <img src={logo} alt="Mapset Verifier" width={width} height={height} style={{ display: "block" }} />;
}
