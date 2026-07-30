import React from "react";
import { Bookmark, Rss } from "lucide-react";
import { STICKY_NOTE, PINTEREST, SUBSTACK } from "../data/widgets";

// Individual widgets that live on the desktop. All content is placeholder
// (nulls -> soft empty states) until Tanisha provides content.

export function StickyNoteWidget() {
    return (
        <div
            className="w-[180px] rounded-[10px] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.15)] rotate-[-3deg]"
            style={{
                background: "linear-gradient(180deg,#ffe27a 0%,#ffd24d 100%)",
            }}
            data-testid="widget-sticky"
        >
            <div className="h-3 rounded-t-[10px] bg-black/5" />
            <div className="p-3 pt-2 sticky-hand min-h-[96px]">
                {STICKY_NOTE.content ? (
                    <p>{STICKY_NOTE.content}</p>
                ) : (
                    <p className="text-[#4a3a1d]/70 italic">
                        {STICKY_NOTE.placeholderLine1}
                        <br />
                        {STICKY_NOTE.placeholderLine2}
                    </p>
                )}
            </div>
        </div>
    );
}

export function PinterestWidget() {
    return (
        <div
            className="w-[300px] rounded-[18px] bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_18px_30px_-10px_rgba(0,0,0,0.28)] overflow-hidden"
            data-testid="widget-pinterest"
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
                <div className="w-5 h-5 rounded-full bg-[#e60023] flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold">P</span>
                </div>
                <span className="text-[12px] font-semibold text-[#1c1c1e]">
                    Pinterest
                </span>
                <span className="ml-auto text-[10.5px] text-[#8a8a8f]">
                    {PINTEREST.boardTitle}
                </span>
            </div>
            <div className="grid grid-cols-4 gap-1 p-2">
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
            className="w-[200px] rounded-[16px] bg-white/90 backdrop-blur-xl border border-white/70 shadow-[0_18px_30px_-10px_rgba(0,0,0,0.28)] overflow-hidden"
            data-testid="widget-substack"
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5">
                <div className="w-5 h-5 rounded-md bg-[#ff6719] flex items-center justify-center">
                    <Rss size={11} className="text-white" />
                </div>
                <span className="text-[12px] font-semibold text-[#1c1c1e]">
                    Substack
                </span>
                <span className="ml-auto text-[10.5px] text-[#8a8a8f]">
                    latest
                </span>
            </div>
            <div className="p-3 min-h-[92px]">
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
                        <div className="text-[13px] serif italic text-[#1c1c1e] leading-snug">
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
