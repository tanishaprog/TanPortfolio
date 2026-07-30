import React from "react";
import { Bookmark } from "lucide-react";
import { STICKY_NOTE, PINTEREST, SUBSTACK } from "../data/widgets";
import { SubstackIcon } from "./DockIcons";

// macOS-style desktop widgets. All content is placeholder (nulls -> soft empty
// states) until Tanisha provides content.
// Layout on desktop: Substack (wide) → Pinterest (square) → Sticky Notes (wide)

const WIDGET_SHADOW =
    "0 20px 40px -14px rgba(0,0,0,0.35), 0 4px 8px -2px rgba(0,0,0,0.12)";

export function StickyNoteWidget() {
    return (
        <div
            className="w-[300px] rounded-[16px] overflow-hidden"
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
            <div className="p-4 pt-3 sticky-hand min-h-[110px]">
                {STICKY_NOTE.content ? (
                    <p>{STICKY_NOTE.content}</p>
                ) : (
                    <ul className="text-[#4a3a1d]/70 italic space-y-1 leading-relaxed">
                        <li>· sticky note</li>
                        <li>· content coming soon.</li>
                    </ul>
                )}
            </div>
        </div>
    );
}

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
                        className="aspect-square rounded-md relative overflow-hidden"
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
