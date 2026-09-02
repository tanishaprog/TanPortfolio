import React, { useState } from "react";
import Window from "./Window";
import { AnimatePresence, motion } from "framer-motion";
import { SAFARI_TABS, SAFARI_INITIAL_TAB } from "../data/projects";
import ProjectModal from "./ProjectModal";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Shield,
    Share,
    Sidebar,
    Copy,
    Hash,
    Newspaper,
    Film,
    Megaphone,
    Globe,
    MapPin,
    RefreshCcw,
    SlidersHorizontal,
    ChevronDown,
} from "lucide-react";

const ICONS = {
    megaphone: Megaphone,
    film: Film,
    hash: Hash,
    globe: Globe,
    "map-pin": MapPin,
    newspaper: Newspaper,
};

const FILTERS = ["All", "Videos", "Images", "News", "Web", "Tools"];

export default function SafariWindow(props) {
    // Only show tabs that have at least one populated case study.
    const visibleTabs = SAFARI_TABS
        .map((tab) => ({
            ...tab,
            projects: tab.projects.filter((p) => !p.isPlaceholder),
        }))
        .filter((tab) => tab.projects.length > 0);

    const initialTabId = visibleTabs.find((t) => t.id === SAFARI_INITIAL_TAB)
        ? SAFARI_INITIAL_TAB
        : visibleTabs[0]?.id;

    const [activeTabId, setActiveTabId] = useState(initialTabId);
    const [openProject, setOpenProject] = useState(null);

    const activeTab =
        visibleTabs.find((t) => t.id === activeTabId) ?? visibleTabs[0];
    const queryLabel = activeTab?.title.toLowerCase() ?? "";

    return (
        <Window
            {...props}
            testid="safari"
            title=""
            className="!bg-[rgba(246,246,247,0.94)]"
            titleBarExtras={
                <div className="flex items-center gap-3 text-[#8a8a8f]">
                    <Copy size={13} />
                    <Share size={13} />
                    <Sidebar size={13} />
                </div>
            }
        >
            {/* Tab strip */}
            <div className="h-8 border-b border-black/[0.08] bg-[rgba(232,232,235,0.9)] flex items-end px-2 gap-[2px] overflow-x-auto no-scrollbar">
                {visibleTabs.map((tab) => {
                    const Icon = ICONS[tab.favicon] ?? Globe;
                    const active = tab.id === activeTabId;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            data-testid={`safari-tab-${tab.id}`}
                            className={`group relative flex items-center gap-1.5 px-3 h-[26px] rounded-t-[6px] text-[12px] font-medium min-w-[130px] max-w-[190px] transition-colors ${
                                active
                                    ? "bg-[rgba(246,246,247,0.98)] text-[#1c1c1e] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_-0.5px_0_rgba(0,0,0,0.08)]"
                                    : "bg-transparent text-[#6a6a6f] hover:bg-black/[0.05]"
                            }`}
                        >
                            <Icon size={11} strokeWidth={2} />
                            <span className="truncate">{tab.title}</span>
                        </button>
                    );
                })}
                <button
                    className="ml-1 w-6 h-6 rounded flex items-center justify-center text-[#6a6a6f] hover:bg-black/5"
                    aria-label="New tab"
                    data-testid="safari-new-tab"
                >
                    <Plus size={13} />
                </button>
            </div>

            {/* Toolbar (Safari address bar) */}
            <div className="h-11 border-b border-black/[0.08] bg-[rgba(240,240,242,0.94)] flex items-center px-3 gap-2">
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Back">
                    <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#c9c9cf]" aria-label="Forward" disabled>
                    <ChevronRight size={16} strokeWidth={2.5} />
                </button>
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Sidebar">
                    <Sidebar size={13} />
                </button>

                {/* Address field */}
                <div className="flex-1 mx-1 h-[26px] rounded-[6px] bg-white shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)] flex items-center px-2.5 gap-2 text-[12px] text-[#3a3a3d]">
                    <SlidersHorizontal size={11} className="text-[#8a8a8f]" />
                    <Shield size={11} className="text-[#8a8a8f]" />
                    <span className="text-[#3a3a3d] truncate flex-1 text-center">
                        <span className="text-[#8a8a8f]">google.com/search?q=</span>
                        {queryLabel.replace(/\s+/g, "+")}
                    </span>
                    <RefreshCcw size={11} className="text-[#8a8a8f]" />
                </div>

                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Share">
                    <Share size={14} />
                </button>
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Tabs">
                    <Copy size={13} />
                </button>
            </div>

            {/* Content, search results (Google-style) */}
            <div className="h-[calc(100%-78px)] overflow-auto mac-scroll bg-white">
                {/* Google header */}
                <div className="border-b border-black/[0.07] px-8 pt-5 pb-0">
                    <div className="flex items-center gap-8">
                        <div className="serif text-[26px] leading-none tracking-[-0.02em] text-[#1c1c1e] select-none">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span>
                        </div>
                        <div className="flex-1 max-w-[560px] h-[44px] rounded-full border border-[#dfe1e5] shadow-[0_1px_6px_rgba(32,33,36,0.08)] flex items-center px-5 gap-3 text-[14px] text-[#1c1c1e] bg-white">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="7" stroke="#8a8a8f" strokeWidth="2" />
                                <path d="m20 20-4-4" stroke="#8a8a8f" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>{queryLabel}</span>
                        </div>
                    </div>
                    {/* Filters */}
                    <div className="mt-4 flex items-center gap-1 -mb-px">
                        {FILTERS.map((f, i) => {
                            const active = i === 0;
                            return (
                                <button
                                    key={f}
                                    className={`px-3 py-2 text-[13px] border-b-[3px] ${
                                        active
                                            ? "border-[#1a73e8] text-[#1a73e8]"
                                            : "border-transparent text-[#5f6368] hover:text-[#1c1c1e]"
                                    }`}
                                >
                                    {f}
                                </button>
                            );
                        })}
                        <button className="px-2 py-2 text-[13px] text-[#5f6368] flex items-center gap-1 ml-2">
                            Tools <ChevronDown size={11} />
                        </button>
                    </div>
                </div>

                {/* Results container */}
                <div className="max-w-[652px] mx-0 pl-[100px] pr-8 py-5">
                    <div className="text-[12px] text-[#70757a] mb-3">
                        About {activeTab.projects.length} results (0.
                        {(activeTab.projects.length * 7).toString().padStart(2, "0")}{" "}
                        seconds)
                    </div>

                    <div className="space-y-6">
                        <AnimatePresence mode="popLayout">
                            {activeTab.projects.map((project, i) => (
                                <motion.button
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{
                                        delay: i * 0.03,
                                        duration: 0.35,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    onClick={() => setOpenProject(project)}
                                    data-testid={`safari-result-${project.id}`}
                                    className="group text-left block w-full"
                                >
                                    {/* Site chip */}
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="w-[26px] h-[26px] rounded-full bg-[linear-gradient(160deg,#f6c48a,#c9a0a8,#8a7bb0)] shrink-0 border border-black/5"
                                            aria-hidden
                                        />
                                        <div className="flex flex-col leading-tight min-w-0">
                                            <span className="text-[13px] text-[#1c1c1e]">
                                                tanisha.work
                                            </span>
                                            <span className="text-[11.5px] text-[#5f6368] truncate">
                                                {project.url.replace("www.", "")}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="mt-[6px] text-[20px] leading-[1.3] font-normal text-[#1a0dab] group-hover:underline decoration-[#1a0dab]/70 underline-offset-2">
                                        {project.title} | Tanisha
                                    </h3>

                                    <p className="text-[14px] text-[#4d5156] leading-[1.55] mt-1 max-w-[560px]">
                                        <span className="text-[#70757a] mr-1">
                                            {randomDate(project.id)},
                                        </span>
                                        {project.snippet}
                                    </p>

                                    <div className="mt-1 flex items-center gap-3 text-[12px] text-[#70757a]">
                                        <span className="inline-flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-[#70757a]" />
                                            {activeTab.title}
                                        </span>
                                        <span>·</span>
                                        <span>Placeholder case study</span>
                                    </div>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-10 pt-6 border-t border-black/[0.06] text-center text-[12px] text-[#70757a]">
                        Page 1 of {activeTab.projects.length} · Placeholder results, real case
                        studies coming soon
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {openProject && (
                    <ProjectModal
                        project={openProject}
                        onClose={() => setOpenProject(null)}
                    />
                )}
            </AnimatePresence>
        </Window>
    );
}

// Deterministic pseudo-date per project id, purely cosmetic
function randomDate(seed) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const d = (h % 27) + 1;
    const m = months[h % 12];
    const y = 2022 + ((h >> 3) % 4);
    return `${m} ${d}, ${y}`;
}
