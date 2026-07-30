import { useEffect, useState } from "react";

// Mobile detection based on width (< 900px) or coarse pointer.
export function useIsMobile(breakpoint = 900) {
    const detect = () => {
        if (typeof window === "undefined") return false;
        const narrow = window.innerWidth < breakpoint;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        return narrow || coarse;
    };

    const [isMobile, setIsMobile] = useState(detect);

    useEffect(() => {
        const onResize = () => setIsMobile(detect());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return isMobile;
}
