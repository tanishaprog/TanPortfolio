import React from "react";
import Window from "./Window";
import { Search, Plus, Share, PenLine } from "lucide-react";

const DECORATIVE_NOTES = [
    { id: "2am", title: "2 A.M. Ideas", date: "Today", preview: "" },
    { id: "grocery", title: "grocery", date: "Yesterday", preview: "milk, coffee, mangoes, more coffee…" },
    { id: "book", title: "books i want to finish", date: "12 Jan", preview: "Bluets · The Argonauts · Ways of Seeing…" },
    { id: "cats", title: "cat vet dates", date: "10 Jan", preview: "next appointment: 22 Feb, 5 pm" },
    { id: "movies", title: "films to rewatch", date: "3 Jan", preview: "In the Mood for Love · Perfect Days…" },
    { id: "wishlist", title: "birthday wishlist", date: "27 Dec", preview: "a used typewriter · a good pen · that scarf" },
];

export default function NotesWindow(props) {
    const [selected, setSelected] = React.useState("2am");
    const active = DECORATIVE_NOTES.find((n) => n.id === selected);

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
                        {DECORATIVE_NOTES.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => setSelected(n.id)}
                                data-testid={`note-${n.id}`}
                                className={`w-full text-left px-3 py-2 border-l-2 ${
                                    selected === n.id
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
                <section className="flex-1 flex flex-col bg-[#fbfaf6]" data-testid="notes-editor">
                    <div className="h-8 border-b border-black/5 flex items-center justify-center text-[11px] text-[#8a8a8f]">
                        {active?.date}
                    </div>
                    <div className="flex-1 overflow-auto mac-scroll px-12 py-8">
                        <h1 className="text-[22px] font-semibold text-[#1c1c1e]">
                            {active?.title}
                        </h1>
                        {active?.id === "2am" ? (
                            <div className="mt-6 text-[14.5px] leading-relaxed text-[#6a6a6f] italic serif">
                                {/* Interactive but intentionally empty */}
                                (this note is empty on purpose — tanisha will fill it in soon.)
                            </div>
                        ) : (
                            <div className="mt-6 text-[14.5px] leading-relaxed text-[#3a3a3d]">
                                {active?.preview}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Window>
    );
}
