import { useEffect, useState } from "react";

// Returns an object with { time, date } in Indian Standard Time,
// regardless of the visitor's local timezone.
export function useISTClock() {
    const compute = () => {
        const now = new Date();
        const time = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        }).format(now);
        const date = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            timeZone: "Asia/Kolkata",
        }).format(now);
        return { time, date };
    };

    const [value, setValue] = useState(compute);

    useEffect(() => {
        const id = setInterval(() => setValue(compute()), 15000);
        return () => clearInterval(id);
    }, []);

    return value;
}
