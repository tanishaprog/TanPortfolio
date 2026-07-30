import React from "react";
import { motion } from "framer-motion";
import { FileText, ImageIcon, Music } from "lucide-react";
import { ABOUT_SCATTER } from "../data/aboutMe";

// A single "paper file" resting on the desktop after About Me opens.
// Double-click opens the associated window.
export default function AboutScatter({ onOpen }) {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            data-testid="about-scatter"
        >
            {ABOUT_SCATTER.map((item, i) => (
                <motion.button
                    key={item.id}
                    initial={{
                        opacity: 0,
                        x: 720,
                        y: 200,
                        rotate: 0,
                        scale: 0.6,
                    }}
                    animate={{
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        rotate: item.rot,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.05 + i * 0.09,
                        duration: 0.75,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        onOpen?.(item);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    data-testid={`scatter-${item.id}`}
                    className="absolute top-0 left-0 pointer-events-auto"
                    style={{ transformOrigin: "center center" }}
                >
                    <FileTile item={item} />
                </motion.button>
            ))}
        </div>
    );
}

function FileTile({ item }) {
    if (item.kind === "image") {
        return (
            <span className="flex flex-col items-center gap-1 w-[92px]">
                <span className="w-[74px] h-[92px] rounded-[6px] overflow-hidden bg-white border border-black/15 shadow-[0_10px_18px_-6px_rgba(0,0,0,0.35)] relative">
                    <img
                        src={item.src}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                </span>
                <span
                    className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
                >
                    {item.label}
                </span>
            </span>
        );
    }
    if (item.kind === "spotify") {
        return (
            <span className="flex flex-col items-center gap-1 w-[100px]">
                <span className="w-[74px] h-[90px] rounded-[6px] overflow-hidden bg-[linear-gradient(160deg,#1ed760,#0b8b3e)] border border-black/15 shadow-[0_10px_18px_-6px_rgba(0,0,0,0.35)] flex items-end justify-center pb-3 relative">
                    <Music size={28} className="text-white" strokeWidth={2} />
                    <span className="absolute top-1.5 left-1.5 text-[8px] font-bold text-white/85 uppercase tracking-wider">
                        Spotify
                    </span>
                </span>
                <span
                    className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
                >
                    {item.label}
                </span>
            </span>
        );
    }
    // Text file (default)
    return (
        <span className="flex flex-col items-center gap-1 w-[92px]">
            <span className="w-[68px] h-[86px] rounded-[6px] bg-white border border-black/15 shadow-[0_10px_18px_-6px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col">
                {/* Folded corner */}
                <span
                    className="absolute top-0 right-0 w-4 h-4 bg-[#eaeaee]"
                    style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                />
                <span
                    className="absolute top-0 right-0 w-4 h-4"
                    style={{
                        borderTop: "1px solid rgba(0,0,0,0.15)",
                        borderRight: "1px solid rgba(0,0,0,0.15)",
                        borderTopRightRadius: 4,
                        clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                    }}
                />
                {/* Faux text lines */}
                <span className="mt-6 px-2 space-y-[3px]">
                    {[0.9, 0.7, 0.85, 0.55, 0.8, 0.6].map((w, i) => (
                        <span
                            key={i}
                            className="block h-[1.5px] rounded-full bg-[#c8c8ce]"
                            style={{ width: `${w * 100}%` }}
                        />
                    ))}
                </span>
                <span className="absolute bottom-1 left-1.5 text-[7.5px] font-bold text-[#8a8a8f] tracking-wider">
                    TXT
                </span>
                <FileText
                    className="absolute bottom-1 right-1 text-[#c9c9cf]"
                    size={10}
                />
            </span>
            <span
                className="icon-label text-[11.5px] leading-tight text-center max-w-full truncate"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
            >
                {item.label}
            </span>
        </span>
    );
}
