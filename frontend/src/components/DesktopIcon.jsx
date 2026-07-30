import React from "react";
import { Trash2 } from "lucide-react";
import { TrashIcon } from "./DockIcons";

/**
 * A single macOS-style desktop icon (folder or trash).
 * Click = select, double-click = open.
 */
export default function DesktopIcon({
    folder,
    isSelected,
    onSelect,
    onOpen,
}) {
    return (
        <button
            className={`desktop-icon flex flex-col items-center gap-1 w-[86px] px-1.5 pt-2 pb-1 rounded-md ${
                isSelected ? "selected bg-white/10" : ""
            }`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect?.(folder.id);
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                onOpen?.(folder.id);
            }}
            data-testid={`desktop-icon-${folder.id}`}
        >
            <span className="relative">
                {folder.icon === "trash" ? (
                    <span className="block w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
                        <TrashIcon size={56} />
                    </span>
                ) : (
                    <FolderGraphic />
                )}
            </span>
            <span className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate">
                {folder.name}
            </span>
        </button>
    );
}

function FolderGraphic() {
    return (
        <span className="block w-14 h-[46px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
            <svg viewBox="0 0 56 46" width="56" height="46" fill="none">
                <defs>
                    <linearGradient id="f-back" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#8fc6ff" />
                        <stop offset="1" stopColor="#4f95dc" />
                    </linearGradient>
                    <linearGradient id="f-front" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#bfe1ff" stopOpacity="0.95" />
                        <stop offset="0.55" stopColor="#7bb7ea" stopOpacity="0.95" />
                        <stop offset="1" stopColor="#5197d8" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="f-tab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#8fc6ff" />
                        <stop offset="1" stopColor="#4788d1" />
                    </linearGradient>
                    <linearGradient id="f-highlight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="white" stopOpacity="0.4" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Tab (back) */}
                <path
                    d="M2 8 C2 5.5 4 3.5 6.5 3.5 H18 C19.6 3.5 21 4.2 22 5.5 L24 8.5 H26 V13 H2 Z"
                    fill="url(#f-tab)"
                />
                {/* Back panel */}
                <path
                    d="M2 12 C2 9.5 4 7.5 6.5 7.5 H49.5 C52 7.5 54 9.5 54 12 V40 C54 42.5 52 44.5 49.5 44.5 H6.5 C4 44.5 2 42.5 2 40 Z"
                    fill="url(#f-back)"
                />
                {/* Front panel */}
                <path
                    d="M2 15.5 C2 13 4 11 6.5 11 H49.5 C52 11 54 13 54 15.5 V40 C54 42.5 52 44.5 49.5 44.5 H6.5 C4 44.5 2 42.5 2 40 Z"
                    fill="url(#f-front)"
                />
                {/* Top sheen */}
                <path
                    d="M2 15.5 C2 13 4 11 6.5 11 H49.5 C52 11 54 13 54 15.5 V22 H2 Z"
                    fill="url(#f-highlight)"
                />
                {/* Outer soft outline */}
                <path
                    d="M2 12 C2 9.5 4 7.5 6.5 7.5 H49.5 C52 7.5 54 9.5 54 12 V40 C54 42.5 52 44.5 49.5 44.5 H6.5 C4 44.5 2 42.5 2 40 Z"
                    fill="none"
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="0.5"
                />
            </svg>
        </span>
    );
}
