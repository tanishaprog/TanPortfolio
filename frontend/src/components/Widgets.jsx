import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { PINTEREST, SUBSTACK } from "../data/widgets";
import { STICKY_CHECKLIST } from "../data/aboutMe";
import { SubstackIcon } from "./DockIcons";

const WIDGET_SHADOW =
    "0 20px 40px -14px rgba(0,0,0,0.35), 0 4px 8px -2px rgba(0,0,0,0.12)";

// ---------- Sticky Note (interactive checklist) ----------

function HandBox({ checked }) {
    // Hand-drawn box (SVG) — filled when checked
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="shrink-0 mt-[3px]"
        >
            <rect
                x="1.5"
                y="1.5"
                width="15"
                height="15"
                rx="2.2"
                ry="2.2"
                fill={checked ? "#8a6a10" : "transparent"}
                stroke="#8a6a10"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {checked && (
                <path
                    d="M4.5 9.4 L7.6 12.4 L13.6 5.8"
                    fill="none"
                    stroke="#fff8dd"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}

export function StickyNoteWidget() {
    const [items, setItems] = useState(STICKY_CHECKLIST);

    const toggle = (id) =>
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
        );

    return (
        <div
            className="w-[300px] rounded-[16px] overflow-hidden select-none"
            style={{
                background: "linear-gradient(180deg,#ffe27a 0%,#ffd24d 100%)",
                boxShadow: WIDGET_SHADOW,
            }}
            data-testid="widget-sticky"
        >
            <div className="h-5 bg-black/5 px-3 flex items-center">
                <span className="text-[10.5px] uppercase tracking-[0.1em] text-[#8a6a10] font-semibold">
                    to-do · today
                </span>
            </div>
            <ul className="px-3.5 pt-3 pb-3.5 space-y-[6px]">
                {items.map((it) => {
                    const emphasized = it.emphasized;
                    return (
                        <li key={it.id}>
                            <button
                                onClick={() => toggle(it.id)}
                                data-testid={`sticky-item-${it.id}`}
                                className="w-full text-left flex items-start gap-2 group"
                                aria-pressed={it.done}
                            >
                                <HandBox checked={it.done} />
                                <span
                                    className={`sticky-hand leading-tight pt-[1px] flex-1 ${
                                        it.done
                                            ? "line-through decoration-[#8a6a10]/70 decoration-[1.5px] text-[#8a6a10]/60"
                                            : "text-[#4a3a1d]"
                                    } ${emphasized ? "font-semibold underline decoration-[#8a6a10]/70 decoration-[1.5px] underline-offset-4" : ""}`}
                                    style={{
                                        fontSize: emphasized ? 20 : 18,
                                    }}
                                >
                                    {it.text}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// ---------- Pinterest & Substack (unchanged) ----------

export function PinterestWidget() {
    return (
        <div
            className="w-[300px] rounded-[18px] bg-white/85 backdrop-blur-xl border border-white/60 overflow-hidden"
            style={{ boxShadow: WIDGET_SHADOW }}
            data-testid="widget-pinterest"
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
                <div className="w-[18px] h-[18px] rounded-full bg-[#e60023] flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">P</span>
                </div>
                <span className="text-[12px] font-semibold text-[#1c1c1e]">
                    Pinterest
                </span>
                <span className="ml-auto text-[10.5px] text-[#8a8a8f]">
                    {PINTEREST.boardTitle}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1 p-2">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-md"
                        style={{
                            background: `linear-gradient(160deg, ${
                                ["#f1c0d3", "#fbd6a4", "#c8d9f2", "#d9c9f0"][i]
                            } 0%, rgba(255,255,255,0.4) 100%)`,
                        }}
                    />
                ))}
            </div>
            <div className="px-3 pb-2 text-[10.5px] text-[#8a8a8f]">
                pins coming soon
            </div>
        </div>
    );
}

export function SubstackWidget() {
    return (
        <div
            className="w-[300px] rounded-[18px] bg-white/95 backdrop-blur-xl border border-white/70 overflow-hidden"
            style={{ boxShadow: WIDGET_SHADOW }}
            data-testid="widget-substack"
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
                <span className="w-[18px] h-[18px] rounded-[4px] overflow-hidden inline-block">
                    <SubstackIcon size={18} />
                </span>
                <span className="text-[12px] font-semibold text-[#1c1c1e]">
                    Substack
                </span>
                <span className="ml-auto text-[10.5px] text-[#8a8a8f]">
                    latest
                </span>
            </div>
            <div className="p-3 min-h-[80px]">
                {SUBSTACK.latestPost ? (
                    <>
                        <div className="text-[13px] font-medium text-[#1c1c1e] leading-snug line-clamp-2">
                            {SUBSTACK.latestPost.title}
                        </div>
                        <div className="text-[11.5px] text-[#6a6a6f] mt-1 line-clamp-2">
                            {SUBSTACK.latestPost.excerpt}
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="text-[15px] serif italic text-[#1c1c1e] leading-snug">
                            {SUBSTACK.publication}
                        </div>
                        <div className="text-[11.5px] text-[#8a8a8f] mt-1">
                            No posts yet. Tanisha is drafting.
                        </div>
                    </div>
                )}
            </div>
            <div className="px-3 pb-2 flex items-center gap-1 text-[10.5px] text-[#8a8a8f]">
                <Bookmark size={10} /> saved · never · a · draft
            </div>
        </div>
    );
}
