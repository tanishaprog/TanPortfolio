import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, ArrowUpRight, X } from "lucide-react";
import { BUSINESS_CARD } from "../data/aboutMe";

const ICONS = {
    email: Mail,
    instagram: Instagram,
    linkedin: Linkedin,
};

// The contact card as a floating object on the desktop — NO window chrome,
// NO backdrop, NO title bar. Just the card, a small dismiss ✕ outside its
// top-right corner, and a subtle 3D tilt as the cursor moves over it.
export default function BusinessCardOverlay({ onClose }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
        const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        // Max ~6° tilt on each axis. Invert X so top-of-card tilts back.
        setTilt({ x: -py * 6, y: px * 6 });
    };

    const handleLeave = () => setTilt({ x: 0, y: 0 });

    const card = BUSINESS_CARD;

    return (
        <motion.div
            className="fixed inset-0 z-[9500] flex items-center justify-center pointer-events-none"
            data-testid="business-card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className="relative pointer-events-auto"
                style={{ perspective: 1400 }}
            >
                {/* Dismiss ✕ — outside top-right corner */}
                <button
                    onClick={onClose}
                    data-testid="business-card-dismiss"
                    aria-label="Dismiss"
                    className="absolute -top-8 -right-8 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center shadow-[0_6px_14px_-4px_rgba(0,0,0,0.5)] transition-colors hover:bg-black/85 z-10"
                >
                    <X size={14} strokeWidth={2.2} />
                </button>

                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transformStyle: "preserve-3d",
                        transition:
                            "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                        willChange: "transform",
                    }}
                    className="w-[720px] max-w-[92vw] rounded-[22px] bg-white overflow-hidden"
                    data-testid="business-card"
                >
                    <div
                        className="absolute inset-0 pointer-events-none rounded-[22px]"
                        style={{
                            boxShadow:
                                "0 40px 80px -20px rgba(0,0,0,0.45), 0 16px 36px -10px rgba(0,0,0,0.22), inset 0 0 0 0.5px rgba(0,0,0,0.05)",
                        }}
                    />
                    <div className="grid grid-cols-[1fr_240px]">
                        {/* Left column — text */}
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

                        {/* Right column — portrait */}
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
                </motion.div>
            </div>
        </motion.div>
    );
}
