import React from "react";

/**
 * A "Contact Me" desktop icon styled like a small business card resting on the
 * desktop (not a folder). Double-click opens the BusinessCardWindow.
 */
export default function ContactCardIcon({ isSelected, onSelect, onOpen }) {
    return (
        <button
            className={`desktop-icon flex flex-col items-center gap-1 w-[86px] px-1.5 pt-2 pb-1 rounded-md ${
                isSelected ? "selected bg-white/10" : ""
            }`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                onOpen?.();
            }}
            data-testid="desktop-icon-contact-me"
        >
            <span className="block w-14 h-[46px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
                <svg viewBox="0 0 56 46" width="56" height="46">
                    <defs>
                        <linearGradient id="card-face" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#ffffff" />
                            <stop offset="1" stopColor="#f2ecdd" />
                        </linearGradient>
                    </defs>
                    {/* Back card (shadow tab) */}
                    <rect
                        x="6"
                        y="10"
                        width="46"
                        height="28"
                        rx="4"
                        fill="#e8e0cf"
                        stroke="rgba(0,0,0,0.12)"
                        strokeWidth="0.5"
                        transform="rotate(-4 29 24)"
                    />
                    {/* Front card */}
                    <rect
                        x="5"
                        y="9"
                        width="46"
                        height="28"
                        rx="4"
                        fill="url(#card-face)"
                        stroke="rgba(0,0,0,0.12)"
                        strokeWidth="0.5"
                    />
                    {/* Portrait circle */}
                    <circle cx="14.5" cy="23" r="5" fill="#c6a67b" />
                    <circle cx="14.5" cy="21" r="1.7" fill="#ffffff" opacity="0.85" />
                    <path
                        d="M10.5 26 Q14.5 30 18.5 26"
                        stroke="#ffffff"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.9"
                    />
                    {/* Name + role lines */}
                    <rect x="24" y="16" width="22" height="2" rx="1" fill="#3a3a3d" />
                    <rect x="24" y="20.5" width="16" height="1.4" rx="0.7" fill="#8a8a8f" />
                    <rect x="24" y="24.5" width="18" height="1" rx="0.5" fill="#c6a67b" />
                    <rect x="24" y="27" width="14" height="1" rx="0.5" fill="#c8c8ce" />
                    <rect x="24" y="29.5" width="10" height="1" rx="0.5" fill="#c8c8ce" />
                </svg>
            </span>
            <span className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate">
                Contact Me
            </span>
        </button>
    );
}
