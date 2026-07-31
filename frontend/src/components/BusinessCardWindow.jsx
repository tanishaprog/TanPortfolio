import React from "react";
import Window from "./Window";
import { Mail, Instagram, Linkedin, Share, Info, ArrowUpRight } from "lucide-react";
import { BUSINESS_CARD } from "../data/aboutMe";

const ICONS = {
    email: Mail,
    instagram: Instagram,
    linkedin: Linkedin,
};

export default function BusinessCardWindow(props) {
    return (
        <Window
            {...props}
            testid="business-card"
            title="Contact Me"
            width={props.width ?? 760}
            height={props.height ?? 620}
            className="!bg-[#f2efe8]"
            bodyClassName="bg-[#f2efe8]"
            titleBarExtras={
                <div className="flex items-center gap-3 text-[#8a8a8f]">
                    <Share size={13} />
                    <Info size={13} />
                </div>
            }
        >
            <div className="h-full w-full flex items-center justify-center p-8">
                <BusinessCard />
            </div>
        </Window>
    );
}

function BusinessCard() {
    const card = BUSINESS_CARD;
    return (
        <div
            className="group relative w-full max-w-[640px] rounded-[22px] bg-white overflow-hidden transition-transform duration-300 hover:-translate-y-[3px]"
            style={{
                boxShadow:
                    "0 22px 45px -18px rgba(0,0,0,0.28), 0 4px 12px -4px rgba(0,0,0,0.12)",
            }}
            data-testid="business-card-body"
        >
            <div className="grid grid-cols-[1fr_240px]">
                {/* Left column, text */}
                <div className="px-10 py-9 flex flex-col">
                    <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#c6a67b]">
                        · say hi ·
                    </div>
                    <h2
                        className="serif text-[36px] leading-[1.05] text-[#1c1c1e] mt-2"
                        data-testid="card-name"
                    >
                        {card.name}
                    </h2>
                    <div className="mt-2 text-[13px] text-[#4a4a52]">
                        {card.roles.map((r, i) => (
                            <span key={r}>
                                {r}
                                {i < card.roles.length - 1 && (
                                    <span className="text-[#c8c8ce] mx-2">·</span>
                                )}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-[14px] leading-[1.55] text-[#3a3a3d] max-w-[340px]">
                        {card.tagline}
                    </p>

                    <div className="mt-7 space-y-2">
                        {card.contact.map((c) => {
                            const Icon = ICONS[c.id];
                            return (
                                <a
                                    key={c.id}
                                    href={c.href}
                                    target={c.external ? "_blank" : undefined}
                                    rel={c.external ? "noreferrer noopener" : undefined}
                                    data-testid={`card-contact-${c.id}`}
                                    className="group/link inline-flex items-center gap-2.5 text-[13.5px] text-[#1c1c1e] hover:text-[#0a67c8] transition-colors"
                                >
                                    <Icon size={14} strokeWidth={1.8} className="text-[#8a8a8f] group-hover/link:text-[#0a67c8]" />
                                    <span className="text-[#6a6a6f] w-[70px]">
                                        {c.label}
                                    </span>
                                    <span className="group-hover/link:underline underline-offset-2">
                                        {c.handle}
                                    </span>
                                    {c.external && (
                                        <ArrowUpRight
                                            size={11}
                                            className="opacity-0 group-hover/link:opacity-100 transition-opacity text-[#0a67c8]"
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#c6a67b] mb-2">
                            available for
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {card.availableFor.map((s) => (
                                <span
                                    key={s}
                                    className="px-2.5 py-[3px] rounded-full bg-[#f7f4ec] text-[11.5px] text-[#4a4a52] border border-[#e9e2d0]"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column, portrait */}
                <div className="relative bg-[#f6f2ea] border-l border-black/[0.05] p-5 flex items-center justify-center">
                    <div
                        className="w-full aspect-[3/4] rounded-[14px] overflow-hidden bg-[#eee7d8]"
                        style={{
                            boxShadow:
                                "0 12px 24px -8px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(0,0,0,0.05)",
                        }}
                    >
                        <img
                            src={card.portrait}
                            alt=""
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </div>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-[#c6a67b]">
                        · 2026 ·
                    </span>
                </div>
            </div>
        </div>
    );
}
