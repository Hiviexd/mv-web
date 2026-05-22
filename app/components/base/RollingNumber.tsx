import { useEffect, useMemo, useState, type CSSProperties } from "react";

interface RollingNumberProps {
    value: number;
    duration?: number;
    digitDelay?: number;
    className?: string;
}

interface RollingDigitProps {
    targetDigit: number;
    duration: number;
    startDelay: number;
    reducedMotion: boolean;
}

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    return prefersReducedMotion;
}

function RollingDigit({ targetDigit, duration, startDelay, reducedMotion }: RollingDigitProps) {
    const [active, setActive] = useState(reducedMotion);
    const digits = useMemo(
        () => Array.from({ length: targetDigit + 1 }, (_, index) => index),
        [targetDigit],
    );

    useEffect(() => {
        if (reducedMotion) {
            setActive(true);
            return;
        }

        const timeoutId = window.setTimeout(() => setActive(true), startDelay);
        return () => window.clearTimeout(timeoutId);
    }, [reducedMotion, startDelay]);

    const stripStyle = {
        "--rolling-offset": targetDigit,
        "--rolling-duration": reducedMotion ? "0ms" : `${duration}ms`,
    } as CSSProperties;

    return (
        <span className="rolling-number__digit" aria-hidden>
            <span className="rolling-number__strip" data-active={active || undefined} style={stripStyle}>
                {digits.map((digit) => (
                    <span key={digit} className="rolling-number__cell">
                        {digit}
                    </span>
                ))}
            </span>
        </span>
    );
}

export function RollingNumber({ value, duration = 1200, digitDelay = 150, className }: RollingNumberProps) {
    const reducedMotion = usePrefersReducedMotion();
    const safeValue = Math.max(0, Math.round(value));
    const displayValue = String(safeValue);
    const digitValues = displayValue.split("").map(Number);
    const classNames = ["rolling-number", className].filter(Boolean).join(" ");

    if (reducedMotion) {
        return (
            <span className={classNames} aria-label={displayValue}>
                {displayValue}
            </span>
        );
    }

    return (
        <span className={classNames} aria-label={displayValue}>
            {digitValues.map((digit, index) => (
                <RollingDigit
                    key={index}
                    targetDigit={digit}
                    duration={duration}
                    startDelay={(digitValues.length - 1 - index) * digitDelay}
                    reducedMotion={reducedMotion}
                />
            ))}
        </span>
    );
}
