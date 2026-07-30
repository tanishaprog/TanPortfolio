import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SAFARI_TABS } from "../data/projects";
import {
    Info,
    X,
    Megaphone,
    Film,
    Hash,
    Globe,
    MapPin,
    Newspaper,
    ChevronRight,
    ArrowLeft,
    ExternalLink,
} from "lucide-react";

const ICONS = {
    megaphone: Megaphone,
    film: Film,
    hash: Hash,
    globe: Globe,
    "map-pin": MapPin,
    newspaper: Newspaper,
};

// Mobile-only view: opens directly into Safari with the portfolio.
export default function MobileSafari() {
    const [dismissed, setDismissed] = useState(false);
    const [tabId, setTabId] = useState(SAFARI_TABS[0].id);
    const [openProject, setOpenProject] = useState(null);
    const activeTab = SAFARI_TABS.find((t) => t.id === tabId) ?? SAFARI_TABS[0];

    return (
        <div
            className="w-screen h-screen overflow-hidden bg-[#f6f6f7] text-[#1c1c1e] flex flex-col"
            data-testid="mobile-safari"
        >
            {/* Info banner */}
            <AnimatePresence>
                {!dismissed && (
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-3 mt-3 rounded-2xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] border border-black/5 p-3 flex items-start gap-2.5"
                        data-testid="mobile-banner"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#0a84ff]/10 flex items-center justify-center shrink-0">
                            <Info size={14} className="text-[#0a84ff]" />
                        </div>
                        <div className="flex-1 text-[12.5px] leading-snug text-[#3a3a3d]">
                            <b>Better viewed on a laptop or desktop</b> for the
                            full interactive macOS experience.
                        </div>
                        <button
                            onClick={() => setDismissed(true)}
                            className="text-[#8a8a8f] hover:text-[#1c1c1e] shrink-0"
                            aria-label="Dismiss"
                            data-testid="mobile-banner-dismiss"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Safari URL bar */}
            <div className="mx-3 mt-3 h-9 rounded-xl bg-black/[0.06] border border-black/5 flex items-center px-3 gap-2 text-[12.5px] text-[#6a6a6f]">
                <div className="w-4 h-4 rounded-full bg-[linear-gradient(160deg,#e6ddd0,#c9b98f)]" />
                <span className="truncate">
                    tanisha.work/{activeTab.id}
                </span>
            </div>

            {/* Tabs */}
            <div className="mt-3 px-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {SAFARI_TABS.map((t) => {
                    const Icon = ICONS[t.favicon] ?? Globe;
                    const active = t.id === tabId;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTabId(t.id)}
                            data-testid={`mobile-tab-${t.id}`}
                            className={`px-3 py-1.5 rounded-full text-[12.5px] whitespace-nowrap flex items-center gap-1.5 border ${
                                active
                                    ? "bg-[#1c1c1e] text-white border-[#1c1c1e]"
                                    : "bg-white text-[#3a3a3d] border-black/10"
                            }`}
                        >
                            <Icon size={12} strokeWidth={2} />
                            {t.title}
                        </button>
                    );
                })}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto mac-scroll bg-white mt-3 mx-3 mb-3 rounded-2xl border border-black/5 p-5">
                <div className="text-[11.5px] uppercase tracking-[0.14em] text-[#8a8a8f]">
                    Results for
                </div>
                <h1
                    className="serif text-[30px] leading-[1.1] text-[#1c1c1e]"
                    data-testid="mobile-heading"
                >
                    {activeTab.title.toLowerCase()}
                </h1>

                <ul className="mt-5 space-y-4">
                    {activeTab.projects.map((project) => (
                        <li key={project.id}>
                            <button
                                onClick={() => setOpenProject(project)}
                                className="text-left w-full"
                                data-testid={`mobile-result-${project.id}`}
                            >
                                <div className="text-[11.5px] text-[#6a6a6f] truncate">
                                    {project.url}
                                </div>
                                <div className="text-[16px] text-[#1a0dab] font-medium mt-0.5">
                                    {project.brand}
                                </div>
                                <div className="text-[12.5px] text-[#4d4d52] mt-0.5 line-clamp-2">
                                    {project.snippet}
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Quick links */}
                <div className="mt-8 pt-6 border-t border-black/5">
                    <div className="text-[11.5px] uppercase tracking-[0.14em] text-[#8a8a8f]">
                        Also on this site
                    </div>
                    <ul className="mt-2 divide-y divide-black/5">
                        {[
                            { label: "About Me", desc: "placeholder — coming soon" },
                            { label: "Resume", desc: "Final Resume.pdf — coming soon" },
                            { label: "Contact", desc: "placeholder — coming soon" },
                            { label: "Cat Pics", desc: "gallery — coming soon" },
                        ].map((link) => (
                            <li key={link.label}>
                                <button className="w-full py-3 flex items-center gap-2 text-left">
                                    <div className="flex-1">
                                        <div className="text-[14px] text-[#1c1c1e]">
                                            {link.label}
                                        </div>
                                        <div className="text-[11.5px] text-[#8a8a8f]">
                                            {link.desc}
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-[#8a8a8f]" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Project detail (full-screen) */}
            <AnimatePresence>
                {openProject && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-white z-30 overflow-auto"
                        data-testid={`mobile-project-${openProject.id}`}
                    >
                        <div className="h-52 bg-[linear-gradient(160deg,#f4c48a_0%,#c9a0a8_60%,#8a7bb0_100%)] relative">
                            <div className="absolute inset-0 grain" />
                            <button
                                onClick={() => setOpenProject(null)}
                                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/25 backdrop-blur-md text-white flex items-center justify-center"
                                aria-label="Back"
                                data-testid="mobile-project-back"
                            >
                                <ArrowLeft size={16} />
                            </button>
                        </div>
                        <div className="p-5">
                            <h2 className="serif text-[28px] text-[#1c1c1e]">
                                {openProject.brand}
                            </h2>
                            <p className="text-[12.5px] text-[#6a6a6f] mt-1 flex items-center gap-1.5">
                                {openProject.url}
                                <ExternalLink size={11} />
                            </p>
                            <p className="mt-5 text-[14px] leading-relaxed text-[#3a3a3d]">
                                {openProject.snippet}
                            </p>
                            <div className="mt-5 text-[13px] text-[#6a6a6f] italic">
                                Placeholder case study — the full write-up will
                                land here.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
