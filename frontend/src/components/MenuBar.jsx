import React, { useState } from "react";
import {
    Wifi,
    Bluetooth,
    Search,
    SlidersHorizontal,
    BatteryLow,
    Apple,
} from "lucide-react";
import { useISTClock } from "../hooks/useISTClock";

const LEFT_ITEMS = [
    { id: "app", label: "Finder", bold: true },
    { id: "file", label: "File" },
    { id: "edit", label: "Edit" },
    { id: "view", label: "View" },
    { id: "go", label: "Go" },
    { id: "window", label: "Window" },
    { id: "help", label: "Help" },
];

function BatteryIndicator() {
    // Always ~25%
    return (
        <div
            className="flex items-center gap-1"
            data-testid="menu-battery"
            title="25%"
        >
            <span className="text-[12px] tabular-nums tracking-tight">
                25%
            </span>
            <div className="relative">
                <div className="w-6 h-3 rounded-[3px] border border-white/70 flex items-center px-[1.5px]">
                    <div
                        className="h-[7px] rounded-[1px] bg-white"
                        style={{ width: "25%" }}
                    />
                </div>
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 rounded-r-[1px] bg-white/80" />
            </div>
        </div>
    );
}

export default function MenuBar() {
    const { time, date } = useISTClock();
    const [active, setActive] = useState(null);

    return (
        <div
            className="menu-bar absolute top-0 left-0 right-0 z-[9000] px-2 flex items-center justify-between select-none"
            data-testid="menu-bar"
        >
            {/* Left */}
            <div className="flex items-center h-full">
                <button
                    className="menu-bar-item"
                    aria-label="Apple menu"
                    data-testid="menu-apple"
                    onMouseEnter={() => setActive("apple")}
                    onMouseLeave={() => setActive(null)}
                >
                    <Apple size={14} className="text-white drop-shadow-sm" fill="white" strokeWidth={0} />
                </button>
                {LEFT_ITEMS.map((item, i) => (
                    <button
                        key={item.id}
                        className="menu-bar-item"
                        data-testid={`menu-${item.id}`}
                        onMouseEnter={() => setActive(item.id)}
                        onMouseLeave={() => setActive(null)}
                        style={{ fontWeight: i === 0 ? 600 : 400 }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Right */}
            <div className="flex items-center h-full gap-0.5">
                <BatteryIndicator />
                <button
                    className="menu-bar-item"
                    aria-label="Wifi"
                    data-testid="menu-wifi"
                >
                    <Wifi size={14} strokeWidth={2} />
                </button>
                <button
                    className="menu-bar-item"
                    aria-label="Bluetooth"
                    data-testid="menu-bluetooth"
                >
                    <Bluetooth size={13} strokeWidth={2} />
                </button>
                <button
                    className="menu-bar-item"
                    aria-label="Search"
                    data-testid="menu-search"
                >
                    <Search size={13} strokeWidth={2} />
                </button>
                <button
                    className="menu-bar-item"
                    aria-label="Control Center"
                    data-testid="menu-control-center"
                >
                    <SlidersHorizontal size={13} strokeWidth={2} />
                </button>
                <div
                    className="menu-bar-item tabular-nums"
                    data-testid="menu-clock"
                    title="Indian Standard Time"
                >
                    <span className="opacity-95">{date}</span>
                    <span className="mx-1.5 opacity-70">·</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
}
