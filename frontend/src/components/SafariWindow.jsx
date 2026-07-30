import React, { useState } from "react";
import Window from "./Window";
import { AnimatePresence, motion } from "framer-motion";
import { SAFARI_TABS, SAFARI_INITIAL_TAB } from "../data/projects";
import ProjectModal from "./ProjectModal";
import {
    Search,
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
} from "lucide-react";

const ICONS = {
    megaphone: Megaphone,
    film: Film,
    hash: Hash,
    globe: Globe,
    "map-pin": MapPin,
    newspaper: Newspaper,
};

export default function SafariWindow(props) {
    const [activeTabId, setActiveTabId] = useState(SAFARI_INITIAL_TAB);
    const [openProject, setOpenProject] = useState(null);

    const activeTab =
        SAFARI_TABS.find((t) => t.id === activeTabId) ?? SAFARI_TABS[0];

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
            <div className="h-9 border-b border-black/5 bg-[rgba(238,238,240,0.9)] flex items-end px-2 gap-1 overflow-x-auto no-scrollbar">
                {SAFARI_TABS.map((tab) => {
                    const Icon = ICONS[tab.favicon] ?? Globe;
                    const active = tab.id === activeTabId;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            data-testid={`safari-tab-${tab.id}`}
                            className={`group relative flex items-center gap-1.5 px-3 h-7 rounded-t-[8px] rounded-b-none text-[12px] font-medium min-w-[120px] max-w-[190px] transition-colors ${
                                active
                                    ? "bg-[rgba(246,246,247,0.98)] text-[#1c1c1e] shadow-[0_-1px_0_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                    : "bg-transparent text-[#6a6a6f] hover:bg-black/[0.04]"
                            }`}
                        >
                            <Icon size={12} strokeWidth={2} />
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

            {/* Toolbar */}
            <div className="h-11 border-b border-black/5 bg-[rgba(246,246,247,0.94)] flex items-center px-3 gap-2">
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Back">
                    <ChevronLeft size={16} />
                </button>
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#c9c9cf]" aria-label="Forward" disabled>
                    <ChevronRight size={16} />
                </button>
                <div className="flex-1 h-7 rounded-md bg-[rgba(0,0,0,0.05)] border border-black/5 flex items-center px-3 gap-2 text-[12px] text-[#3a3a3d]">
                    <Shield size={12} className="text-[#8a8a8f]" />
                    <span className="text-[#6a6a6f] truncate">
                        tanisha.work — {activeTab.title.toLowerCase()}
                    </span>
                    <Search size={12} className="ml-auto text-[#8a8a8f]" />
                </div>
                <button className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5" aria-label="Share">
                    <Share size={14} />
                </button>
            </div>

            {/* Content — search-style results */}
            <div className="h-[calc(100%-80px)] overflow-auto mac-scroll bg-white">
                <div className="max-w-3xl mx-auto px-8 py-8">
                    <div className="text-[11.5px] uppercase tracking-[0.14em] text-[#8a8a8f] mb-1">
                        Results for
                    </div>
                    <h1
                        className="serif text-[42px] leading-[1.05] text-[#1c1c1e]"
                        data-testid="safari-heading"
                    >
                        {activeTab.title.toLowerCase()}
                    </h1>
                    <p className="text-[13px] text-[#6a6a6f] mt-2">
                        About {activeTab.projects.length} results (0.0{Math.max(1, activeTab.projects.length % 9)}{" "}
                        seconds)
                    </p>

                    <div className="mt-8 space-y-6">
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
                                    <div className="flex items-center gap-2 text-[12px] text-[#6a6a6f]">
                                        <span className="w-4 h-4 rounded-full bg-[linear-gradient(160deg,#e6ddd0,#c9b98f)] shrink-0" />
                                        <span className="truncate">
                                            {project.url}
                                        </span>
                                    </div>
                                    <h3 className="mt-1 text-[19px] font-medium text-[#1a0dab] group-hover:underline decoration-[#1a0dab]/60 underline-offset-2">
                                        {project.brand}
                                    </h3>
                                    <p className="text-[13.5px] text-[#4d4d52] leading-snug mt-1 max-w-2xl">
                                        {project.snippet}
                                    </p>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-14 mb-4 text-center text-[12px] text-[#8a8a8f]">
                        Placeholder results — real case studies coming soon.
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
