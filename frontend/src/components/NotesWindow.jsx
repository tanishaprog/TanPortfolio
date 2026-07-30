import React, { useState } from "react";
import Window from "./Window";
import { Search, Plus, Share, PenLine } from "lucide-react";
import { NOTES } from "../data/notes";

export default function NotesWindow(props) {
    const [selectedId, setSelectedId] = useState(NOTES[0].id);
    const active = NOTES.find((n) => n.id === selectedId) ?? NOTES[0];

    return (
        <Window
            {...props}
            testid="notes"
            title="Notes"
            titleBarExtras={
                <div className="flex items-center gap-2 text-[#8a8a8f]">
                    <PenLine size={13} />
                    <Share size={13} />
                </div>
            }
        >
            <div className="h-full flex bg-[#fbfaf6]">
                {/* Sidebar */}
                <aside className="w-[220px] border-r border-black/5 bg-[#f2ecdd] flex flex-col">
                    <div className="px-3 pt-3 pb-2 flex items-center gap-2">
                        <button
                            className="w-6 h-6 rounded flex items-center justify-center text-[#8a8a8f] hover:bg-black/5"
                            aria-label="New note"
                            data-testid="notes-new"
                        >
                            <Plus size={14} />
                        </button>
                        <div className="flex-1 h-6 rounded-md bg-white/60 border border-black/5 flex items-center px-2 gap-1.5 text-[12px] text-[#8a8a8f]">
                            <Search size={11} />
                            Search
                        </div>
                    </div>
                    <div className="px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-wider text-[#8a8a8f]">
                        On My Mac
                    </div>
                    <div className="flex-1 overflow-auto mac-scroll">
                        {NOTES.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => setSelectedId(n.id)}
                                data-testid={`note-${n.id}`}
                                className={`w-full text-left px-3 py-2 border-l-2 ${
                                    selectedId === n.id
                                        ? "bg-[#f7c948]/70 border-[#c99b1a]"
                                        : "border-transparent hover:bg-black/[0.04]"
                                }`}
                            >
                                <div className="text-[13px] font-medium text-[#1c1c1e] truncate">
                                    {n.title}
                                </div>
                                <div className="text-[11.5px] text-[#6a6a6f] mt-0.5 truncate">
                                    <span className="text-[#3a3a3d] mr-1">
                                        {n.date}
                                    </span>
                                    {n.preview || "No additional text"}
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Editor */}
                <section
                    className="flex-1 flex flex-col bg-[#fbfaf6]"
                    data-testid="notes-editor"
                >
                    <div className="h-8 border-b border-black/5 flex items-center justify-center text-[11px] text-[#8a8a8f]">
                        {active.date}
                    </div>
                    <div className="flex-1 overflow-auto mac-scroll px-12 py-8">
                        <h1
                            className="text-[22px] font-semibold text-[#1c1c1e]"
                            data-testid="note-title"
                        >
                            {active.title}
                        </h1>
                        <NoteBody note={active} />
                    </div>
                </section>
            </div>
        </Window>
    );
}

function NoteBody({ note }) {
    if (note.kind === "empty") {
        return (
            <div
                className="mt-6 text-[14.5px] leading-relaxed text-[#6a6a6f] italic serif"
                data-testid={`note-body-${note.id}`}
            >
                {note.body}
            </div>
        );
    }
    if (note.kind === "list") {
        return (
            <ul
                className="mt-6 space-y-1.5 text-[14.5px] leading-relaxed text-[#1c1c1e]"
                data-testid={`note-body-${note.id}`}
            >
                {note.body.map((item, i) => (
                    <li key={i} className="flex gap-2">
                        <span className="text-[#8a8a8f]">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    }
    if (note.kind === "checklist") {
        return <NotesChecklist note={note} />;
    }
    if (note.kind === "sections") {
        return (
            <div
                className="mt-6 text-[14.5px] leading-relaxed text-[#1c1c1e] space-y-6"
                data-testid={`note-body-${note.id}`}
            >
                {note.body.map((section) => (
                    <div key={section.heading}>
                        <h2 className="text-[17px] font-semibold text-[#1c1c1e]">
                            {section.heading}
                        </h2>
                        <ul className="mt-2 space-y-1.5">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-[#8a8a8f]">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {note.footer && (
                    <p className="mt-6 text-[13.5px] italic text-[#6a6a6f]">
                        {note.footer}
                    </p>
                )}
            </div>
        );
    }
    return null;
}

function NotesChecklist({ note }) {
    const [items, setItems] = useState(note.body);
    return (
        <div className="mt-6" data-testid={`note-body-${note.id}`}>
            <ul className="space-y-1.5 text-[14.5px] leading-relaxed">
                {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                        <NotesCheckbox
                            checked={it.done}
                            onClick={() =>
                                setItems((prev) =>
                                    prev.map((x, j) =>
                                        j === i ? { ...x, done: !x.done } : x,
                                    ),
                                )
                            }
                            testid={`note-checkbox-${note.id}-${i}`}
                        />
                        <span
                            className={
                                it.done
                                    ? "line-through text-[#8a8a8f] decoration-[#8a8a8f]/70"
                                    : "text-[#1c1c1e]"
                            }
                        >
                            {it.text}
                        </span>
                    </li>
                ))}
            </ul>
            {note.footer && (
                <p className="mt-6 text-[13.5px] italic text-[#6a6a6f]">
                    {note.footer}
                </p>
            )}
        </div>
    );
}

function NotesCheckbox({ checked, onClick, testid }) {
    return (
        <button
            role="checkbox"
            aria-checked={checked}
            onClick={onClick}
            data-testid={testid}
            className="shrink-0 mt-[3px]"
        >
            <svg width="16" height="16" viewBox="0 0 16 16">
                <circle
                    cx="8"
                    cy="8"
                    r="7"
                    fill={checked ? "#f7c948" : "#ffffff"}
                    stroke={checked ? "#c99b1a" : "#c8c8ce"}
                    strokeWidth="1"
                />
                {checked && (
                    <path
                        d="M4.5 8.4 L7 10.6 L11.6 5.6"
                        fill="none"
                        stroke="#8a6a10"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </button>
    );
}
