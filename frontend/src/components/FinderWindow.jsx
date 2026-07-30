import React, { useMemo, useState } from "react";
import Window from "./Window";
import {
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    List as ListIcon,
    Search,
    FileText,
    FileType,
    FileImage,
    FileAudio,
    FileArchive,
    Folder,
    Trash2,
    Mail,
    AtSign,
    Instagram,
    Linkedin,
    Globe,
    Phone,
    Cat,
    ImagePlus,
} from "lucide-react";
import { FOLDERS } from "../data/folders";

const SIDEBAR = [
    { id: "recents", label: "Recents", icon: FileText },
    { id: "desktop", label: "Desktop", icon: Folder },
    { id: "documents", label: "Documents", icon: Folder },
    { id: "downloads", label: "Downloads", icon: Folder },
];

const FILE_ICON = {
    pdf: FileType,
    doc: FileText,
    txt: FileText,
    img: FileImage,
    audio: FileAudio,
    zip: FileArchive,
};

export default function FinderWindow({ folderId, onOpenFile, ...props }) {
    const folder = useMemo(
        () => FOLDERS.find((f) => f.id === folderId) ?? FOLDERS[0],
        [folderId],
    );

    return (
        <Window
            {...props}
            testid={`finder-${folder.id}`}
            title={folder.name}
            width={props.width ?? 780}
            height={props.height ?? 500}
            icon={
                folder.icon === "trash" ? (
                    <Trash2 size={13} className="text-[#8a8a8f]" />
                ) : (
                    <Folder size={13} className="text-[#5aa0ff]" />
                )
            }
            titleBarExtras={
                <div className="flex items-center gap-2 text-[#8a8a8f]">
                    <LayoutGrid size={13} />
                    <ListIcon size={13} />
                    <Search size={13} />
                </div>
            }
        >
            <div className="h-full flex bg-[rgba(246,246,247,0.98)]">
                {/* Sidebar */}
                <aside className="w-[180px] shrink-0 bg-[rgba(232,232,235,0.85)] border-r border-black/5 py-3">
                    <div className="px-3 pb-1 text-[10.5px] uppercase tracking-wider text-[#8a8a8f]">
                        Favourites
                    </div>
                    {SIDEBAR.map((s) => (
                        <div
                            key={s.id}
                            className="mx-2 px-2 py-1 rounded-md text-[12.5px] text-[#3a3a3d] flex items-center gap-2 hover:bg-black/5"
                        >
                            <s.icon size={13} className="text-[#7a7a80]" />
                            {s.label}
                        </div>
                    ))}
                    <div className="px-3 pt-3 pb-1 text-[10.5px] uppercase tracking-wider text-[#8a8a8f]">
                        Locations
                    </div>
                    <div className="mx-2 px-2 py-1 rounded-md text-[12.5px] text-[#3a3a3d] bg-[rgba(10,132,255,0.15)] flex items-center gap-2">
                        <Folder size={13} className="text-[#5aa0ff]" />
                        Macintosh HD
                    </div>
                </aside>

                {/* Main */}
                <section className="flex-1 flex flex-col">
                    {/* Toolbar */}
                    <div className="h-9 border-b border-black/5 flex items-center px-3 gap-2 text-[#8a8a8f]">
                        <ChevronLeft size={14} />
                        <ChevronRight size={14} />
                        <div className="ml-2 text-[12.5px] text-[#3a3a3d] font-medium">
                            {folder.name}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Search size={13} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto mac-scroll">
                        <FinderBody folder={folder} onOpenFile={onOpenFile} />
                    </div>

                    {/* Status bar */}
                    <div className="h-6 border-t border-black/5 text-[11px] text-[#8a8a8f] flex items-center justify-center bg-[rgba(240,240,242,0.9)]">
                        {statusLine(folder)}
                    </div>
                </section>
            </div>
        </Window>
    );
}

function statusLine(folder) {
    if (folder.body.kind === "files")
        return `${folder.body.files.length} items · placeholder`;
    if (folder.body.kind === "gallery")
        return `${folder.body.images.length} photos · placeholder`;
    if (folder.body.kind === "about") return "About Tanisha · placeholder";
    if (folder.body.kind === "contact") return "1 card · placeholder";
    return "";
}

function FinderBody({ folder, onOpenFile }) {
    if (folder.body.kind === "files") {
        return <FilesGrid folder={folder} onOpenFile={onOpenFile} />;
    }
    if (folder.body.kind === "about") return <AboutPlaceholder folder={folder} />;
    if (folder.body.kind === "contact")
        return <ContactPlaceholder folder={folder} />;
    if (folder.body.kind === "gallery")
        return <GalleryPlaceholder folder={folder} onOpenFile={onOpenFile} />;
    return null;
}

function FilesGrid({ folder, onOpenFile }) {
    const [selected, setSelected] = useState(null);
    return (
        <div
            className="p-6 grid grid-cols-4 gap-x-4 gap-y-6"
            onClick={() => setSelected(null)}
        >
            {folder.body.files.map((file) => {
                const Icon = FILE_ICON[file.type] ?? FileText;
                const isSel = selected === file.name;
                return (
                    <button
                        key={file.name}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected(file.name);
                        }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            onOpenFile?.(folder, file);
                        }}
                        data-testid={`file-${file.name}`}
                        className={`flex flex-col items-center gap-1 group px-1 py-1 rounded-md ${
                            isSel ? "bg-[rgba(10,132,255,0.14)]" : ""
                        }`}
                    >
                        <span
                            className={`w-14 h-16 rounded-[6px] flex items-center justify-center bg-white border border-black/10 shadow-sm relative ${
                                !file.openable ? "opacity-95" : ""
                            }`}
                        >
                            <Icon size={26} className="text-[#5a5a60]" strokeWidth={1.4} />
                            <span className="absolute bottom-1 right-1 text-[8px] font-semibold uppercase text-[#8a8a8f]">
                                {file.type}
                            </span>
                        </span>
                        <span
                            className={`text-[11.5px] px-1.5 py-[1px] rounded-sm ${
                                isSel
                                    ? "bg-[rgba(10,132,255,0.85)] text-white"
                                    : "text-[#1c1c1e]"
                            }`}
                        >
                            {file.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function AboutPlaceholder({ folder }) {
    return (
        <div className="p-10 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[#8a8a8f]">
                About Me · placeholder
            </div>
            <h1 className="serif text-[40px] leading-tight text-[#1c1c1e] mt-1">
                Hi, I&apos;m Tanisha.
            </h1>
            <p className="mt-4 text-[14px] text-[#6a6a6f] max-w-lg leading-relaxed">
                {folder.body.summary}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
                {folder.body.sections.map((s) => (
                    <div
                        key={s}
                        className="rounded-xl border border-dashed border-black/15 p-4 bg-white/60"
                    >
                        <div className="text-[10.5px] uppercase tracking-wider text-[#8a8a8f]">
                            {s}
                        </div>
                        <div className="mt-1.5 text-[13px] text-[#8a8a8f] italic">
                            coming soon
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContactPlaceholder({ folder }) {
    const ICONS = {
        Email: Mail,
        LinkedIn: Linkedin,
        Instagram: Instagram,
        Website: Globe,
        Phone: Phone,
    };
    return (
        <div className="p-8">
            <div className="max-w-md mx-auto mt-4 rounded-2xl bg-white shadow-[0_18px_30px_-12px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden">
                <div className="h-24 bg-[linear-gradient(160deg,#f4c48a,#c9a0a8,#8a7bb0)] relative">
                    <div className="absolute inset-0 grain" />
                </div>
                <div className="px-6 pb-6 -mt-9">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center serif text-[26px] text-[#1c1c1e]">
                        T
                    </div>
                    <h2 className="mt-3 serif text-[24px] text-[#1c1c1e]">
                        Tanisha
                    </h2>
                    <div className="text-[12.5px] text-[#8a8a8f]">
                        placeholder contact card
                    </div>

                    <ul className="mt-5 divide-y divide-black/5">
                        {folder.body.fields.map((f) => {
                            const Icon = ICONS[f.label] ?? AtSign;
                            return (
                                <li
                                    key={f.label}
                                    className="py-2 flex items-center gap-3"
                                >
                                    <Icon size={14} className="text-[#5aa0ff]" />
                                    <span className="text-[12.5px] text-[#3a3a3d] w-20">
                                        {f.label}
                                        {f.optional ? "*" : ""}
                                    </span>
                                    <span className="text-[13px] text-[#8a8a8f] italic">
                                        {f.value ?? "not provided yet"}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function GalleryPlaceholder({ folder, onOpenFile }) {
    const [selected, setSelected] = useState(null);
    if (folder.body.images.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-8">
                <div className="w-16 h-16 rounded-2xl bg-white border border-black/10 flex items-center justify-center shadow-sm">
                    <Cat size={30} className="text-[#8a8a8f]" strokeWidth={1.5} />
                </div>
                <div className="serif text-[22px] text-[#1c1c1e]">
                    nothing here yet
                </div>
                <div className="text-[13px] text-[#8a8a8f] max-w-sm">
                    {folder.body.emptyState}
                </div>
                <button className="mt-3 flex items-center gap-1.5 text-[12px] text-[#0a84ff] hover:underline">
                    <ImagePlus size={12} /> import photos
                </button>
            </div>
        );
    }
    return (
        <div
            className="p-5 grid grid-cols-4 gap-3"
            onClick={() => setSelected(null)}
        >
            {folder.body.images.map((img, i) => {
                const isSel = selected === img.name;
                return (
                    <button
                        key={img.name}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected(img.name);
                        }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            onOpenFile?.(folder, {
                                name: img.name,
                                type: "img",
                                openable: true,
                                src: img.src,
                            });
                        }}
                        data-testid={`gallery-${img.name}`}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <span
                            className={`w-full aspect-square rounded-md overflow-hidden bg-[#e8e8ea] border ${
                                isSel
                                    ? "border-[#0a84ff] ring-2 ring-[#0a84ff]/40"
                                    : "border-black/10"
                            } shadow-sm`}
                        >
                            <img
                                src={img.src}
                                alt=""
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </span>
                        <span
                            className={`text-[11px] px-1.5 py-[1px] rounded-sm max-w-full truncate ${
                                isSel
                                    ? "bg-[rgba(10,132,255,0.85)] text-white"
                                    : "text-[#1c1c1e]"
                            }`}
                        >
                            {img.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
