import React from "react";

/**
 * High-fidelity SVG recreations of macOS app icons.
 * Each renders inside a 60x60 viewBox; the parent controls the actual size
 * via width/height on the wrapping <svg>. Icons are rendered on their own
 * squircle background, no extra tile is needed.
 *
 * Not official Apple assets, hand-drawn to feel unmistakably macOS while
 * respecting IP. Keep proportions consistent (14px radius on 60px = ~23%).
 */

const R = 14; // squircle radius on 60x60

const Box = ({ id, children, fill = "white" }) => (
    <>
        <rect x="0" y="0" width="60" height="60" rx={R} ry={R} fill={fill} />
        {children}
        {/* Global gloss */}
        <rect
            x="0"
            y="0"
            width="60"
            height="30"
            rx={R}
            ry={R}
            fill={`url(#${id}-gloss)`}
            style={{ pointerEvents: "none" }}
        />
        {/* Global inner stroke */}
        <rect
            x="0.5"
            y="0.5"
            width="59"
            height="59"
            rx={R - 0.5}
            ry={R - 0.5}
            fill="none"
            stroke="rgba(0,0,0,0.14)"
            strokeWidth="0.75"
        />
    </>
);

const Gloss = ({ id }) => (
    <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="white" stopOpacity="0.25" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
    </linearGradient>
);

/* --------------------------------- FINDER --------------------------------- */
export function FinderIcon({ size = 60 }) {
    const id = "finder";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7bb8ff" />
                    <stop offset="1" stopColor="#3d78d6" />
                </linearGradient>
                <linearGradient id={`${id}-white`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#dfe4ec" />
                </linearGradient>
                <Gloss id={id} />
                <clipPath id={`${id}-clip`}>
                    <rect x="0" y="0" width="60" height="60" rx={R} ry={R} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}-clip)`}>
                <rect width="60" height="60" fill={`url(#${id}-blue)`} />
                {/* Split face: left white, right blue */}
                <path
                    d="M0 0 L28 0 L34 60 L0 60 Z"
                    fill={`url(#${id}-white)`}
                />
                {/* Eyes */}
                <rect x="19" y="20" width="3.4" height="11" rx="1.7" fill="#1a1a1c" />
                <rect x="37.5" y="20" width="3.4" height="11" rx="1.7" fill="#f7fafc" />
                {/* Smile */}
                <path
                    d="M17 40 Q30 51 43 40"
                    stroke="#1a1a1c"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                />
            </g>
            <Box id={id} fill="transparent" />
        </svg>
    );
}

/* --------------------------------- SAFARI --------------------------------- */
export function SafariIcon({ size = 60 }) {
    const id = "safari";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <radialGradient id={`${id}-bg`} cx="0.5" cy="0.5" r="0.7">
                    <stop offset="0" stopColor="#82ceff" />
                    <stop offset="0.7" stopColor="#1178d9" />
                    <stop offset="1" stopColor="#08477a" />
                </radialGradient>
                <linearGradient id={`${id}-dial`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f5f7fb" />
                    <stop offset="1" stopColor="#cfd6e0" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            {/* Outer ring */}
            <circle cx="30" cy="30" r="21" fill="#0a4d9a" />
            <circle cx="30" cy="30" r="20" fill={`url(#${id}-dial)`} />
            {/* Ticks */}
            {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * Math.PI) / 12;
                const isMajor = i % 6 === 0;
                const r1 = isMajor ? 15.5 : 17.5;
                const r2 = 19.2;
                const x1 = 30 + Math.sin(a) * r1;
                const y1 = 30 - Math.cos(a) * r1;
                const x2 = 30 + Math.sin(a) * r2;
                const y2 = 30 - Math.cos(a) * r2;
                return (
                    <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#8b95a5"
                        strokeWidth={isMajor ? 1.4 : 0.7}
                        strokeLinecap="round"
                    />
                );
            })}
            {/* N label */}
            <text
                x="30"
                y="15"
                textAnchor="middle"
                fontSize="4"
                fill="#4a5568"
                fontWeight="700"
            >
                N
            </text>
            {/* Needle */}
            <polygon points="30,13.5 32.6,30 30,30.8" fill="#e53c3c" />
            <polygon points="30,46.5 27.4,30 30,29.2" fill="#f4f5f7" />
            <circle cx="30" cy="30" r="1.6" fill="#1a1a1c" />
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* --------------------------------- NOTES ---------------------------------- */
export function NotesIcon({ size = 60 }) {
    const id = "notes";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-header`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fbdd6e" />
                    <stop offset="1" stopColor="#e8b634" />
                </linearGradient>
                <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#f2ecdd" />
                </linearGradient>
                <Gloss id={id} />
                <clipPath id={`${id}-clip`}>
                    <rect width="60" height="60" rx={R} ry={R} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}-clip)`}>
                <rect width="60" height="60" fill={`url(#${id}-body)`} />
                <rect width="60" height="14" fill={`url(#${id}-header)`} />
                {/* rings */}
                {[15, 30, 45].map((x) => (
                    <circle key={x} cx={x} cy="7" r="1.8" fill="#00000022" />
                ))}
                {/* text lines */}
                {[22, 29, 36, 43, 50].map((y, i) => (
                    <line
                        key={y}
                        x1="10"
                        y1={y}
                        x2={50 - i * 3}
                        y2={y}
                        stroke="#dbcda0"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                ))}
            </g>
            <Box id={id} fill="transparent" />
        </svg>
    );
}

/* --------------------------------- PHOTOS --------------------------------- */
export function PhotosIcon({ size = 60 }) {
    const id = "photos";
    // Colored pinwheel of six petals
    const petals = [
        { color: "#ff5c5c", rot: 0 },
        { color: "#ffb63a", rot: 60 },
        { color: "#f2d94a", rot: 120 },
        { color: "#54c757", rot: 180 },
        { color: "#3aa4ff", rot: 240 },
        { color: "#a94af0", rot: 300 },
    ];
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <Gloss id={id} />
                <clipPath id={`${id}-clip`}>
                    <rect width="60" height="60" rx={R} ry={R} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}-clip)`}>
                <rect width="60" height="60" fill="#ffffff" />
                <g transform="translate(30 30)">
                    {petals.map((p, i) => (
                        <ellipse
                            key={i}
                            cx="0"
                            cy="-11"
                            rx="7.5"
                            ry="12.5"
                            fill={p.color}
                            opacity="0.85"
                            transform={`rotate(${p.rot})`}
                            style={{ mixBlendMode: "multiply" }}
                        />
                    ))}
                </g>
            </g>
            <Box id={id} fill="transparent" />
        </svg>
    );
}

/* ------------------------------- APPLE MUSIC ------------------------------ */
export function MusicIcon({ size = 60 }) {
    const id = "music";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ff7ba3" />
                    <stop offset="1" stopColor="#ff2470" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            {/* eighth note */}
            <path
                d="M40 13 L40 39 A6 4.5 0 1 1 34 34.5 L34 20 L28 22 L28 44 A6 4.5 0 1 1 22 39.5 L22 18 Z"
                fill="#ffffff"
            />
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* -------------------------------- CALENDAR -------------------------------- */
export function CalendarIcon({ size = 60, day = 30, weekday = "THU" }) {
    const id = "calendar";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e9eaee" />
                </linearGradient>
                <Gloss id={id} />
                <clipPath id={`${id}-clip`}>
                    <rect width="60" height="60" rx={R} ry={R} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}-clip)`}>
                <rect width="60" height="60" fill={`url(#${id}-body)`} />
                <rect width="60" height="14" fill="#ffffff" />
                <text
                    x="30"
                    y="10"
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="700"
                    fill="#ea3232"
                    fontFamily="Geist, sans-serif"
                >
                    {weekday}
                </text>
                <text
                    x="30"
                    y="47"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="300"
                    fill="#2d2d31"
                    fontFamily="Geist, sans-serif"
                    letterSpacing="-1"
                >
                    {day}
                </text>
            </g>
            <Box id={id} fill="transparent" />
        </svg>
    );
}

/* ---------------------------------- MAIL ---------------------------------- */
export function MailIcon({ size = 60 }) {
    const id = "mail";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#82caff" />
                    <stop offset="1" stopColor="#1e78ff" />
                </linearGradient>
                <linearGradient id={`${id}-env`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e6ecf3" />
                </linearGradient>
                <Gloss id={id} />
                <clipPath id={`${id}-clip`}>
                    <rect width="60" height="60" rx={R} ry={R} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}-clip)`}>
                <rect width="60" height="60" fill={`url(#${id}-bg)`} />
                <rect x="9" y="17" width="42" height="27" rx="3" fill={`url(#${id}-env)`} />
                <path
                    d="M9 18 L30 34 L51 18"
                    fill="none"
                    stroke="#2a72d6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </g>
            <Box id={id} fill="transparent" />
        </svg>
    );
}

/* -------------------------------- MESSAGES -------------------------------- */
export function MessagesIcon({ size = 60 }) {
    const id = "messages";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5be080" />
                    <stop offset="1" stopColor="#0fa834" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            {/* bubble */}
            <path
                d="M12 20 Q12 12 22 12 L40 12 Q50 12 50 22 L50 32 Q50 42 40 42 L26 42 L18 48 L20 42 Q12 41 12 32 Z"
                fill="#ffffff"
            />
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* --------------------------------- BOOKS ---------------------------------- */
export function BooksIcon({ size = 60 }) {
    const id = "books";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffb570" />
                    <stop offset="1" stopColor="#ef6a1c" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            <path
                d="M14 17 Q14 15 16 14.5 L26 12.5 Q30 11.7 30 15.5 L30 46 Q30 43 26 43.5 L16 45.5 Q14 46 14 44 Z"
                fill="#ffffff"
                opacity="0.98"
            />
            <path
                d="M46 17 Q46 15 44 14.5 L34 12.5 Q30 11.7 30 15.5 L30 46 Q30 43 34 43.5 L44 45.5 Q46 46 46 44 Z"
                fill="#ffffff"
                opacity="0.98"
            />
            {[20, 25, 30, 35, 40].map((y) => (
                <line
                    key={y}
                    x1="18"
                    y1={y}
                    x2="26"
                    y2={y - 0.7}
                    stroke="#f6b982"
                    strokeWidth="0.9"
                />
            ))}
            {[20, 25, 30, 35, 40].map((y) => (
                <line
                    key={y}
                    x1="34"
                    y1={y - 0.7}
                    x2="42"
                    y2={y}
                    stroke="#f6b982"
                    strokeWidth="0.9"
                />
            ))}
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* -------------------------------- SUBSTACK -------------------------------- */
export function SubstackIcon({ size = 60 }) {
    const id = "substack";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ff8a3d" />
                    <stop offset="1" stopColor="#e0561a" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            <rect x="16" y="17" width="28" height="3.6" fill="#ffffff" />
            <rect x="16" y="24" width="28" height="3.6" fill="#ffffff" />
            <path d="M16 31 L44 31 L44 48 L30 40 L16 48 Z" fill="#ffffff" />
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* -------------------------------- CHAT GPT -------------------------------- */
export function ChatGPTIcon({ size = 60 }) {
    const id = "chatgpt";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2b2b2d" />
                    <stop offset="1" stopColor="#0a0a0b" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            {/* Stylised knot, hand approximation of ChatGPT wordmark */}
            <g
                transform="translate(30 30)"
                stroke="#ffffff"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M-11 -3 A11 11 0 0 1 0 -14 L0 -6 L7 -10" />
                <path d="M3 -14 A11 11 0 0 1 14 -3 L6 0 L10 7" />
                <path d="M14 3 A11 11 0 0 1 3 14 L0 6 L-7 10" />
                <path d="M-3 14 A11 11 0 0 1 -14 3 L-6 0 L-10 -7" />
            </g>
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}

/* --------------------------------- TRASH ---------------------------------- */
export function TrashIcon({ size = 60 }) {
    const id = "trash";
    return (
        <svg width={size} height={size} viewBox="0 0 60 60">
            <defs>
                <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f7f8fa" />
                    <stop offset="1" stopColor="#c5c7ce" />
                </linearGradient>
                <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f7f8fa" />
                    <stop offset="1" stopColor="#b0b3ba" />
                </linearGradient>
                <Gloss id={id} />
            </defs>
            <rect width="60" height="60" rx={R} ry={R} fill={`url(#${id}-bg)`} />
            {/* lid */}
            <rect x="17" y="17" width="26" height="4" rx="2" fill="#7d8088" />
            <rect x="27" y="14" width="6" height="3" rx="1.5" fill="#7d8088" />
            {/* body */}
            <path
                d="M19 23 L41 23 L39 46 Q39 48 37 48 L23 48 Q21 48 21 46 Z"
                fill={`url(#${id}-body)`}
                stroke="#8a8d94"
                strokeWidth="0.7"
            />
            {/* vertical mesh lines */}
            {[25, 30, 35].map((x) => (
                <line
                    key={x}
                    x1={x}
                    y1="25"
                    x2={x - 0.5}
                    y2="46"
                    stroke="#7d8088"
                    strokeWidth="0.9"
                />
            ))}
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx={R - 0.5}
                ry={R - 0.5}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="0.75"
            />
            <rect
                width="60"
                height="30"
                rx={R}
                ry={R}
                fill={`url(#${id}-gloss)`}
            />
        </svg>
    );
}
