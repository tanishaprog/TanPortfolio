import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, ArrowUpRight, PlayCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectModal({ project, onClose }) {
    const cs = project.caseStudy;

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
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                data-testid="project-modal-backdrop"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 6 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="relative z-10 w-[min(880px,94%)] max-h-[86%] overflow-auto mac-scroll bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] border border-black/5"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 z-30 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-md"
                    aria-label="Close"
                    data-testid="project-modal-close"
                >
                    <X size={14} />
                </button>

                {cs ? (
                    <RealCaseStudy project={project} cs={cs} />
                ) : (
                    <PlaceholderCaseStudy project={project} />
                )}
            </motion.div>
        </motion.div>
    );
}

/* -------------------------- Real case study -------------------------- */

function RealCaseStudy({ project, cs }) {
    return (
        <article data-testid="case-study" className="pb-10">
            {/* Hero */}
            <div className="relative aspect-[21/10] w-full overflow-hidden bg-[#111]">
                <img
                    src={cs.heroImage}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 text-white">
                    <div className="text-[11px] tracking-[0.18em] uppercase text-white/80">
                        {cs.heroKicker}
                    </div>
                    <h1 className="serif text-[38px] leading-[1.05] mt-2 max-w-[720px]">
                        {cs.campaignTitle}
                    </h1>
                </div>
            </div>

            {/* Body */}
            <div className="px-8 md:px-10 pt-8">
                {/* Tagline */}
                {cs.tagline && (
                    <p className="serif italic text-[20px] leading-[1.4] text-[#3a3a3d] max-w-[640px]">
                        {cs.tagline}
                    </p>
                )}

                {/* Meta grid */}
                {cs.meta && cs.meta.length > 0 && (
                    <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {cs.meta.map((m) => (
                            <div
                                key={m.label}
                                className="rounded-xl border border-black/5 bg-[#fafafb] p-3.5"
                            >
                                <div className="text-[10.5px] uppercase tracking-[0.14em] text-[#8a8a8f]">
                                    {m.label}
                                </div>
                                <div className="text-[13.5px] text-[#1c1c1e] mt-1 leading-tight">
                                    {m.value}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sections — only render those with actual content */}
                <div className="mt-10 space-y-9">
                    {(cs.sections || [])
                        .filter(sectionHasContent)
                        .map((s, i) => (
                            <Section key={i} section={s} />
                        ))}
                </div>

                {/* CTA */}
                {cs.cta && cs.cta.href && cs.cta.label && (
                    <div className="mt-12 flex items-center justify-between gap-4 flex-wrap border-t border-black/5 pt-8">
                        <div className="serif text-[22px] italic text-[#3a3a3d] max-w-[420px]">
                            {cs.heroLine ||
                                "see the whole thing, better in motion."}
                        </div>
                        <a
                            href={cs.cta.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            data-testid="case-cta"
                            className="group inline-flex items-center gap-2 pl-4 pr-3 py-3 rounded-full bg-[#1c1c1e] text-white text-[13.5px] font-medium hover:bg-[#0a67c8] transition-colors"
                        >
                            <PlayCircle size={16} className="text-[#ff5f57] group-hover:text-white transition-colors" />
                            {cs.cta.label}
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}
// Returns true if a case-study section has any real content in ANY of its
// non-meta fields (anything other than `kind` and `heading`). Recursively
// checks nested arrays and objects, so a section is hidden when its content
// fields are null/undefined, empty strings, empty arrays, empty objects, or
// objects/arrays that only contain other empty values.
function sectionHasContent(section) {
    if (!section) return false;
    const hasRealContent = (value) => {
        if (value == null) return false;
        if (typeof value === "string") return value.trim() !== "";
        if (Array.isArray(value)) return value.some(hasRealContent);
        if (typeof value === "object") return Object.values(value).some(hasRealContent);
        return true;
    };
    for (const key of Object.keys(section)) {
        if (key === "kind" || key === "heading") continue;
        if (hasRealContent(section[key])) return true;
    }
    return false;
}


function Section({ section }) {
    if (section.kind === "text") {
        return (
            <section>
                <SectionHeading>{section.heading}</SectionHeading>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#3a3a3d] max-w-[680px]">
                    {section.body}
                </p>
            </section>
        );
    }
    if (section.kind === "bullets") {
        return (
            <section>
                <SectionHeading>{section.heading}</SectionHeading>
                <ul className="mt-3 space-y-2 text-[14.5px] leading-[1.65] text-[#3a3a3d] max-w-[680px]">
                    {section.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="mt-2.5 w-1 h-1 rounded-full bg-[#c6a67b] shrink-0" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
    if (section.kind === "episodes") {
        return (
            <section>
                <SectionHeading>{section.heading}</SectionHeading>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.episodes.map((ep) => (
                        <div
                            key={ep.n}
                            className="rounded-xl border border-black/5 bg-[#fafafb] p-4"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="serif text-[24px] text-[#c6a67b] leading-none">
                                    {ep.n}
                                </span>
                                <div className="text-[13.5px] font-medium text-[#1c1c1e] leading-tight">
                                    {ep.problem}
                                </div>
                            </div>
                            <div className="mt-2 text-[12px] text-[#6a6a6f] leading-snug">
                                <span className="text-[#8a8a8f]">Guests · </span>
                                {ep.guests}
                            </div>
                            <div className="mt-2 text-[12.5px] text-[#3a3a3d] leading-snug italic">
                                {ep.outcome}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    if (section.kind === "results") {
        return (
            <section>
                <SectionHeading>{section.heading}</SectionHeading>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {section.kpis.map((k) => (
                        <div
                            key={k.label}
                            className="rounded-xl bg-[#1c1c1e] text-white p-4"
                        >
                            <div className="serif text-[28px] leading-none">
                                {k.value}
                            </div>
                            <div className="mt-2 text-[10.5px] uppercase tracking-[0.14em] text-white/70">
                                {k.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    if (section.kind === "deliverables") {
        return (
            <section>
                <SectionHeading>{section.heading}</SectionHeading>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {section.deliverables.map((d) => (
                        <a
                            key={d.n}
                            href={d.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            data-testid={`deliverable-${d.n}`}
                            className="group flex flex-col rounded-xl border border-black/5 bg-[#fafafb] hover:bg-white hover:border-black/10 hover:-translate-y-[2px] transition-all p-4 overflow-hidden"
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="serif text-[22px] text-[#c6a67b] leading-none">
                                    {d.n}
                                </span>
                                <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#8a8a8f]">
                                    YouTube
                                </span>
                            </div>
                            <div className="mt-2 text-[14px] font-medium text-[#1c1c1e] leading-tight">
                                {d.title}
                            </div>
                            <div className="mt-2 text-[12.5px] text-[#4d5156] leading-snug">
                                {d.description}
                            </div>
                            {d.href && (
    <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1c1c1e] group-hover:text-[#0a67c8]">
        <PlayCircle
            size={13}
            className="text-[#ff5f57] group-hover:text-[#0a67c8] transition-colors"
        />
        Watch
        <ArrowUpRight size={11} />
    </div>
)}
                        </a>
                    ))}
                </div>
            </section>
        );
    }
    return null;
}

function SectionHeading({ children }) {
    return (
        <h2 className="text-[10.5px] uppercase tracking-[0.22em] text-[#c6a67b] font-semibold">
            <span className="pr-2 text-[#c8c8ce]">·</span>
            {children}
        </h2>
    );
}

/* -------------------------- Placeholder -------------------------- */

function PlaceholderCaseStudy({ project }) {
    return (
        <>
            <div className="relative h-52 bg-[linear-gradient(160deg,#f4c48a_0%,#c9a0a8_60%,#8a7bb0_100%)]">
                <div className="absolute inset-0 grain" />
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
                            <div className="text-[13px] text-[#3a3a3d] mt-1">-</div>
                        </div>
                    ))}
                </div>

                <section className="mt-8 space-y-4 text-[14.5px] leading-relaxed text-[#3a3a3d]">
                    <p className="serif italic text-[#6a6a6f]">
                        {project.snippet}
                    </p>
                    <p>
                        This is a placeholder case study for{" "}
                        <b>{project.brand}</b>. The final version will include
                        the brief, insight, creative approach, key visuals, and
                        the results.
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-[#4d4d52]">
                        <li>The context and the ask</li>
                        <li>The insight and the idea</li>
                        <li>Execution, stills, films, launches</li>
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
        </>
    );
}
