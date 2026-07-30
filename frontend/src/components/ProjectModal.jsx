import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            className="absolute inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid={`project-modal-${project.id}`}
        >
            <div
                className="absolute inset-0 bg-black/25 backdrop-blur-sm"
                onClick={onClose}
                data-testid="project-modal-backdrop"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 6 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="relative z-10 w-[min(720px,94%)] max-h-[86%] overflow-auto mac-scroll bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] border border-black/5"
            >
                {/* Hero placeholder */}
                <div className="relative h-52 bg-[linear-gradient(160deg,#f4c48a_0%,#c9a0a8_60%,#8a7bb0_100%)]">
                    <div className="absolute inset-0 grain" />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-white backdrop-blur-md"
                        aria-label="Close"
                        data-testid="project-modal-close"
                    >
                        <X size={14} />
                    </button>
                    <div className="absolute bottom-4 left-6 text-white/90 text-[12px] tracking-[0.14em] uppercase">
                        Case Study · Placeholder
                    </div>
                </div>

                <div className="px-8 py-7">
                    <h2 className="serif text-[34px] leading-tight text-[#1c1c1e]">
                        {project.brand}
                    </h2>
                    <p className="text-[13.5px] text-[#6a6a6f] mt-1 flex items-center gap-2">
                        {project.url}{" "}
                        <ExternalLink size={12} className="text-[#8a8a8f]" />
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {["Role", "Year", "Team"].map((k) => (
                            <div
                                key={k}
                                className="rounded-lg border border-black/5 p-3 bg-[#fafafb]"
                            >
                                <div className="text-[10.5px] uppercase tracking-wider text-[#8a8a8f]">
                                    {k}
                                </div>
                                <div className="text-[13px] text-[#3a3a3d] mt-1">—</div>
                            </div>
                        ))}
                    </div>

                    <section className="mt-8 space-y-4 text-[14.5px] leading-relaxed text-[#3a3a3d]">
                        <p className="serif italic text-[#6a6a6f]">
                            {project.snippet}
                        </p>
                        <p>
                            This is a placeholder case study for{" "}
                            <b>{project.brand}</b>. The final version will
                            include the brief, insight, creative approach, key
                            visuals, and the results.
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-[#4d4d52]">
                            <li>The context and the ask</li>
                            <li>The insight and the idea</li>
                            <li>Execution — stills, films, launches</li>
                            <li>Outcomes and what it taught me</li>
                        </ul>
                    </section>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="aspect-[4/3] rounded-xl border border-dashed border-black/15 bg-[#fafafb] flex items-center justify-center text-[12px] text-[#8a8a8f]"
                            >
                                Image placeholder {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
