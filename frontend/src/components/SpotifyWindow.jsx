import React from "react";
import Window from "./Window";
import { MusicIcon } from "./DockIcons";
import { SPOTIFY } from "../data/aboutMe";
import { ArrowUpRight } from "lucide-react";

// Spotify-style floating player with a podcast + song embed.
export default function SpotifyWindow(props) {
    return (
        <Window
            {...props}
            testid="spotify"
            title="Currently Listening"
            width={props.width ?? 660}
            height={props.height ?? 700}
            className="!bg-[#121212]"
            bodyClassName="bg-[#121212] text-white"
            icon={
                <span className="w-4 h-4 inline-block rounded-[3px] overflow-hidden">
                    <MusicIcon size={16} />
                </span>
            }
        >
            <div className="h-full overflow-auto mac-scroll px-5 pt-4 pb-6 space-y-5">
                <SpotifySection item={SPOTIFY.podcast} titleOverride={SPOTIFY.podcast.title} />
                <SpotifySection item={SPOTIFY.song} />

                <div className="pt-2 text-[11px] text-white/40">
                    tanisha&apos;s current loop · pauses when you close the window
                </div>
            </div>
        </Window>
    );
}

function SpotifySection({ item, titleOverride }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/60">
                        {item.label}
                    </div>
                    {titleOverride && (
                        <div
                            className="serif text-[22px] leading-tight mt-1"
                            data-testid="spotify-podcast-title"
                        >
                            {titleOverride}
                        </div>
                    )}
                </div>
                <a
                    href={item.open}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[11.5px] text-white/70 hover:text-white flex items-center gap-1 group"
                    data-testid={`spotify-open-${item.label.toLowerCase()}`}
                >
                    Open in Spotify
                    <ArrowUpRight size={11} className="opacity-70 group-hover:opacity-100" />
                </a>
            </div>
            <div className="mt-3 rounded-[12px] overflow-hidden bg-black/40 relative">
                <iframe
                    title={item.label}
                    data-testid={`spotify-${item.label.toLowerCase()}-embed`}
                    src={item.url}
                    width="100%"
                    height={item.height}
                    frameBorder="0"
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="eager"
                    style={{ borderRadius: 12, border: 0 }}
                />
            </div>
        </div>
    );
}
