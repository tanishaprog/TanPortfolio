import React from "react";
import Window from "./Window";
import {
    ABOUT_ME_TEXT,
    READING_LIST,
    READING_META,
    SHOWS,
    MOVIES,
    WATCHLIST_META,
} from "../data/aboutMe";

// TextEdit-style window. Renders one of three docs based on `doc`:
//   "aboutme" | "reading" | "movies"
export default function TextEditWindow({ doc, name, ...props }) {
    return (
        <Window
            {...props}
            testid={`textedit-${doc}`}
            title={name}
            width={props.width ?? 620}
            height={props.height ?? 560}
            className="!bg-white/95"
            bodyClassName="bg-white"
        >
            <div className="h-full flex flex-col">
                {/* Ruler */}
                <div className="h-6 border-b border-black/[0.07] bg-[rgba(246,246,247,0.9)] flex items-center px-4 gap-3 text-[10.5px] text-[#8a8a8f] tabular-nums">
                    <span>Helvetica</span>
                    <span>·</span>
                    <span>Regular</span>
                    <span>·</span>
                    <span>13</span>
                    <span className="ml-auto">TextEdit</span>
                </div>

                <div className="flex-1 overflow-auto mac-scroll bg-white">
                    <div className="max-w-[560px] mx-auto px-12 py-10 text-[#1c1c1e]">
                        {doc === "aboutme" && <AboutMeDoc />}
                        {doc === "reading" && <ReadingDoc />}
                        {doc === "watchlist" && <WatchlistDoc />}
                    </div>
                </div>
            </div>
        </Window>
    );
}

function AboutMeDoc() {
    // Split on blank lines and render each paragraph. No headings, no bold,
    // no colored text. Just clean readable TextEdit body copy.
    const paragraphs = ABOUT_ME_TEXT.split(/\n\n+/);
    return (
        <div
            className="space-y-4 leading-[1.65] text-[14px]"
            style={{
                fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
            data-testid="doc-aboutme"
        >
            {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-wrap">
                    {p}
                </p>
            ))}
        </div>
    );
}

function NativeCheckbox({ checked, onChange, id }) {
    // macOS Sonoma checkbox look — 14px rounded square, blue when checked
    return (
        <button
            role="checkbox"
            aria-checked={checked}
            onClick={onChange}
            data-testid={id}
            className="shrink-0 mt-[3px]"
        >
            <svg width="14" height="14" viewBox="0 0 14 14">
                <rect
                    x="0.5"
                    y="0.5"
                    width="13"
                    height="13"
                    rx="3"
                    ry="3"
                    fill={checked ? "#0a84ff" : "#ffffff"}
                    stroke={checked ? "#0a84ff" : "#a0a0a5"}
                    strokeWidth="1"
                />
                {checked && (
                    <path
                        d="M3.2 7.4 L5.8 10 L10.6 4.4"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </button>
    );
}

function ReadingDoc() {
    const [items, setItems] = React.useState(READING_LIST);
    return (
        <div
            className="text-[14px] leading-[1.6]"
            style={{
                fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
            data-testid="doc-reading"
        >
            <p className="text-[#1c1c1e]">{READING_META.title}</p>
            <p className="text-[#3a3a3d] mt-1">{READING_META.subtitle}</p>
            <div className="my-4 border-t border-dashed border-black/15" />
            <ul className="space-y-[6px]">
                {items.map((b, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-2.5"
                        data-testid={`book-${i}`}
                    >
                        <NativeCheckbox
                            checked={b.done}
                            id={`book-check-${i}`}
                            onChange={() =>
                                setItems((prev) =>
                                    prev.map((x, j) =>
                                        j === i ? { ...x, done: !x.done } : x,
                                    ),
                                )
                            }
                        />
                        <span
                            className={
                                b.done
                                    ? "line-through decoration-[#8a8a8f]/70 text-[#8a8a8f]"
                                    : "text-[#1c1c1e]"
                            }
                        >
                            {b.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function WatchlistDoc() {
    return (
        <div
            className="text-[14px] leading-[1.7]"
            style={{
                fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
            data-testid="doc-watchlist"
        >
            <p className="text-[#1c1c1e]">{WATCHLIST_META.title}</p>
            <div className="my-4 border-t border-dashed border-black/15" />
            <p className="text-[#1c1c1e] mt-4">Shows</p>
            <ul className="mt-2 space-y-[3px]">
                {SHOWS.map((s, i) => (
                    <li key={i} className="text-[#1c1c1e]">
                        • {s.title}
                        {s.note ? (
                            <span className="text-[#8a8a8f]"> ({s.note})</span>
                        ) : null}
                    </li>
                ))}
            </ul>

            <p className="text-[#1c1c1e] mt-6">Movies</p>
            <ul className="mt-2 space-y-[3px]">
                {MOVIES.map((m, i) => (
                    <li key={i} className="text-[#1c1c1e]">
                        • {m.title}
                    </li>
                ))}
            </ul>

            <p className="whitespace-pre-line text-[#8a8a8f] mt-8">
                {WATCHLIST_META.footer}
            </p>
        </div>
    );
}
