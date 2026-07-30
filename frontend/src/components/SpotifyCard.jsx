import React from "react";
import Window from "./Window";
import { Play, ArrowUpRight, Music } from "lucide-react";
import { SPOTIFY } from "../data/aboutMe";

// Compact Spotify-style floating player. NOT an iframe embed — hand-designed
// card that shows album art, title, artist, Spotify branding, and Open link.
// `variant` = "song" | "podcast"
export default function SpotifyCard({ variant = "song", ...props }) {
    const item = SPOTIFY[variant];
    const gradient = `linear-gradient(160deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`;

    return (
        <Window
            {...props}
            testid={`spotify-${variant}`}
            title=" "
            width={props.width ?? 360}
            height={props.height ?? 148}
            className="!bg-[#181818]"
            bodyClassName="bg-[#181818] text-white"
            minWidth={300}
            minHeight={120}
        >
            <div
                className="h-full w-full flex items-center gap-3 px-3 py-2"
                data-testid={`spotify-card-${variant}`}
            >
                {/* Album art */}
                <div
                    className="w-[76px] h-[76px] rounded-[5px] shrink-0 flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)]"
                    style={{ background: item.art ? undefined : gradient }}
                >
                    {item.art ? (
                        <img
                            src={item.art}
                            alt=""
                            className="w-full h-full object-cover rounded-[5px]"
                            draggable={false}
                        />
                    ) : (
                        <Music size={28} className="text-white/85" strokeWidth={1.5} />
                    )}
                </div>

                {/* Middle: text */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[76px] py-[1px]">
                    <div className="min-w-0">
                        <div
                            className="text-[14px] font-semibold text-white leading-tight truncate"
                            data-testid={`spotify-title-${variant}`}
                        >
                            {item.title}
                        </div>
                        <div className="text-[12px] text-white/60 leading-tight truncate mt-[3px]">
                            {item.artist}
                        </div>
                    </div>
                    <a
                        href={item.open}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-testid={`spotify-open-${variant}`}
                        className="inline-flex items-center gap-1 text-[11px] text-white/80 hover:text-white group w-fit"
                    >
                        <SpotifyLogo />
                        Open in Spotify
                        <ArrowUpRight size={10} className="opacity-70 group-hover:opacity-100" />
                    </a>
                </div>

                {/* Play button */}
                <button
                    className="w-9 h-9 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 transition-transform text-black flex items-center justify-center shrink-0 shadow-[0_4px_10px_-2px_rgba(30,215,96,0.35)]"
                    aria-label="Play"
                    data-testid={`spotify-play-${variant}`}
                    onClick={() => window.open(item.open, "_blank", "noreferrer")}
                >
                    <Play size={14} fill="black" strokeWidth={0} className="ml-[2px]" />
                </button>
            </div>
        </Window>
    );
}

function SpotifyLogo() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#1ed760">
            <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1 .2c-2.8-1.7-6.3-2-10.4-1.1a.75.75 0 0 1-.3-1.5c4.5-1 8.4-.6 11.5 1.3a.75.75 0 0 1 .2 1.1Zm1.5-3.4a.94.94 0 0 1-1.3.3c-3.2-2-8-2.5-11.8-1.4a.94.94 0 0 1-.55-1.8c4.3-1.3 9.7-.7 13.3 1.6a.94.94 0 0 1 .35 1.3Zm.15-3.5c-3.8-2.3-10.2-2.5-13.8-1.4a1.13 1.13 0 0 1-.66-2.15c4.1-1.25 11.1-1 15.4 1.55a1.13 1.13 0 0 1-1.16 1.95Z" />
        </svg>
    );
}
