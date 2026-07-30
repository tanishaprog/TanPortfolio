import React from "react";
import { Folder, Trash2 } from "lucide-react";

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
    const Icon = folder.icon === "trash" ? Trash2 : Folder;

    return (
        <button
            className={`desktop-icon flex flex-col items-center gap-1 w-[92px] px-2 pt-2 pb-1 rounded-md ${
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
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#e6e6ea] to-[#b7b7bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center">
                        <Icon size={30} className="text-[#4b4b52]" strokeWidth={1.6} />
                    </span>
                ) : (
                    <FolderGraphic color={folder.color} />
                )}
            </span>
            <span className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate">
                {folder.name}
            </span>
        </button>
    );
}

function FolderGraphic({ color = "#f6c86b" }) {
    // A more macOS-like folder illustration (two overlapping tabs, soft shadow)
    return (
        <span className="relative block w-16 h-14">
            <svg viewBox="0 0 64 56" width="64" height="56" fill="none">
                <defs>
                    <linearGradient id="lg-back" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7dbcff" />
                        <stop offset="100%" stopColor="#3f88d8" />
                    </linearGradient>
                    <linearGradient id="lg-front" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9fd0ff" />
                        <stop offset="100%" stopColor="#4b96de" />
                    </linearGradient>
                </defs>
                {/* Back panel with tab */}
                <path
                    d="M4 12 C4 9 6 7 9 7 H22 L27 11 H55 C58 11 60 13 60 16 V44 C60 47 58 49 55 49 H9 C6 49 4 47 4 44 Z"
                    fill="url(#lg-back)"
                />
                {/* Front panel */}
                <path
                    d="M4 18 C4 15 6 13 9 13 H55 C58 13 60 15 60 18 V44 C60 47 58 49 55 49 H9 C6 49 4 47 4 44 Z"
                    fill="url(#lg-front)"
                />
                {/* Sheen */}
                <path
                    d="M4 18 C4 15 6 13 9 13 H55 C58 13 60 15 60 18 V22 H4 Z"
                    fill="rgba(255,255,255,0.18)"
                />
            </svg>
        </span>
    );
}
