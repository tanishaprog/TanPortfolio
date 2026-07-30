import React, { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Wallpaper from "./Wallpaper";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import ContactCardIcon from "./ContactCardIcon";
import { StickyNoteWidget } from "./Widgets";
import SafariWindow from "./SafariWindow";
import NotesWindow from "./NotesWindow";
import FinderWindow from "./FinderWindow";
import FilePreview from "./FilePreview";
import TextEditWindow from "./TextEditWindow";
import ImagePreviewWindow from "./ImagePreviewWindow";
import SpotifyCard from "./SpotifyCard";
import BusinessCardOverlay from "./BusinessCardOverlay";
import { FOLDERS } from "../data/folders";

// A window has: id, type, folderId (for finder), z, minimized, plus type-specific fields.
const initialWindows = [
    { id: "safari", type: "safari", z: 3, minimized: false, x: 380, y: 54, w: 1080, h: 720 },
    { id: "notes", type: "notes", z: 4, minimized: false, x: 430, y: 100, w: 440, h: 340 },
];

// Position spec for the About Me set — 4 windows: portrait (background),
// aboutme.txt (center/front), spotify song + podcast (right column).
const ABOUT_ME_LAYOUT = [
    {
        order: 0,
        id: "preview-about-portrait",
        type: "preview-image",
        src: "/portrait-about.webp",
        name: "portrait.jpg",
        x: 260,
        y: 78,
        w: 440,
        h: 560,
        zOffset: 1,
    },
    {
        order: 1,
        id: "textedit-aboutme",
        type: "textedit",
        doc: "aboutme",
        name: "aboutme.txt",
        x: 560,
        y: 120,
        w: 620,
        h: 560,
        zOffset: 4, // front-most
    },
    {
        order: 2,
        id: "spotify-song",
        type: "spotify-card",
        variant: "song",
        x: 1240,
        y: 260,
        w: 360,
        h: 144,
        zOffset: 2,
    },
    {
        order: 3,
        id: "spotify-podcast",
        type: "spotify-card",
        variant: "podcast",
        x: 1240,
        y: 90,
        w: 360,
        h: 144,
        zOffset: 3,
    },
];

const STAGGER = 0.1; // seconds between window entrances

export default function Desktop() {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [windows, setWindows] = useState(initialWindows);
    const [zCounter, setZCounter] = useState(10);
    const [preview, setPreview] = useState(null);
    const [contactCardOpen, setContactCardOpen] = useState(false);

    const focus = useCallback((id) => {
        setWindows((ws) => {
            const next = zCounter + 1;
            setZCounter(next);
            return ws.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w));
        });
    }, [zCounter]);

    const close = useCallback((id) => {
        setWindows((ws) => ws.filter((w) => w.id !== id));
    }, []);

    const minimize = useCallback((id) => {
        setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    }, []);

    const pushWindow = useCallback(
        (spec) => {
            setWindows((ws) => {
                const next = zCounter + 1;
                setZCounter(next);
                if (ws.some((w) => w.id === spec.id)) {
                    return ws.map((w) =>
                        w.id === spec.id ? { ...w, z: next, minimized: false } : w,
                    );
                }
                return [...ws, { ...spec, z: next, minimized: false }];
            });
        },
        [zCounter],
    );

    // Open the About Me set — all six windows appear with a tiny stagger.
    const openAboutMeSet = useCallback(() => {
        setWindows((ws) => {
            // Minimise Safari + Notes so the About Me set becomes the focus
            const minimised = ws.map((w) =>
                w.type === "safari" || w.type === "notes"
                    ? { ...w, minimized: true }
                    : w,
            );
            // Remove any previous instances of these windows so they don't stack
            const stripIds = new Set(ABOUT_ME_LAYOUT.map((l) => l.id));
            const cleaned = minimised.filter((w) => !stripIds.has(w.id));

            const base = zCounter + 10;
            setZCounter(base + 10);

            const newWindows = ABOUT_ME_LAYOUT.map((spec) => ({
                id: spec.id,
                type: spec.type,
                doc: spec.doc,
                name: spec.name,
                src: spec.src,
                variant: spec.variant,
                x: spec.x,
                y: spec.y,
                w: spec.w,
                h: spec.h,
                z: base + spec.zOffset,
                minimized: false,
                entryDelay: spec.order * STAGGER,
            }));

            return [...cleaned, ...newWindows];
        });
    }, [zCounter]);

    const openFolder = useCallback(
        (folderId) => {
            if (folderId === "about") {
                openAboutMeSet();
                return;
            }
            const id = `finder-${folderId}`;
            const idx = windows.filter((w) => w.type === "finder").length;
            pushWindow({
                id,
                type: "finder",
                folderId,
                x: 240 + idx * 30,
                y: 110 + idx * 24,
                w: 780,
                h: 500,
            });
        },
        [pushWindow, windows, openAboutMeSet],
    );

    const openFile = useCallback(
        (folder, file) => {
            if (!file.openable) return;
            if (file.type === "img" && file.src) {
                pushWindow({
                    id: `preview-${folder.id}-${file.name}`,
                    type: "preview-image",
                    src: file.src,
                    name: file.name,
                    x: 320 + Math.random() * 80,
                    y: 90 + Math.random() * 40,
                    w: 560,
                    h: 640,
                });
                return;
            }
            setPreview({ folder: folder.id, file });
        },
        [pushWindow],
    );

    const handleDockClick = useCallback(
        (item) => {
            if (item.id === "safari")
                return pushWindow({
                    id: "safari",
                    type: "safari",
                    x: 380,
                    y: 54,
                    w: 1080,
                    h: 720,
                });
            if (item.id === "notes")
                return pushWindow({
                    id: "notes",
                    type: "notes",
                    x: 430,
                    y: 100,
                    w: 440,
                    h: 340,
                });
            if (item.id === "trash")
                return pushWindow({
                    id: "finder-trash",
                    type: "finder",
                    folderId: "trash",
                    x: 280,
                    y: 130,
                    w: 720,
                    h: 460,
                });
            if (item.id === "finder")
                return pushWindow({
                    id: "finder-resume",
                    type: "finder",
                    folderId: "resume",
                    x: 280,
                    y: 130,
                    w: 780,
                    h: 500,
                });
        },
        [pushWindow],
    );

    const runningIds = Array.from(
        new Set(
            windows.map((w) => {
                if (w.type === "safari") return "safari";
                if (w.type === "notes") return "notes";
                if (w.type === "finder") return "finder";
                if (w.type === "spotify-card") return "spotify";
                if (w.type === "textedit") return "finder";
                return null;
            }),
        ),
    ).filter(Boolean);

    // IST day + weekday for the Calendar dock icon
    const istDate = useMemo(() => {
        const now = new Date();
        const day = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            timeZone: "Asia/Kolkata",
        }).format(now);
        const weekday = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            timeZone: "Asia/Kolkata",
        })
            .format(now)
            .toUpperCase();
        return { day: parseInt(day, 10), weekday };
    }, []);

    return (
        <div
            className="w-screen h-screen overflow-hidden relative"
            onClick={() => setSelectedIcon(null)}
            data-testid="desktop"
        >
            <Wallpaper customUrl="/wallpaper.png" />
            <MenuBar />

            {/* Right column: desktop folders + Contact Me file */}
            <div
                className="absolute right-4 top-9 flex flex-col gap-1 items-center z-[10]"
                data-testid="desktop-folders"
            >
                {FOLDERS.map((f) => (
                    <DesktopIcon
                        key={f.id}
                        folder={f}
                        isSelected={selectedIcon === f.id}
                        onSelect={setSelectedIcon}
                        onOpen={openFolder}
                    />
                ))}
                <ContactCardIcon
                    isSelected={selectedIcon === "contact-me"}
                    onSelect={() => setSelectedIcon("contact-me")}
                    onOpen={() => setContactCardOpen(true)}
                />
            </div>

            {/* Sticky Notes anchored top-left — only remaining widget */}
            <div
                className="absolute left-5 top-9 z-[10]"
                data-testid="desktop-widgets"
            >
                <StickyNoteWidget />
            </div>

            {/* Windows */}
            <AnimatePresence>
                {windows
                    .filter((w) => !w.minimized)
                    .map((w) => {
                        const commonProps = {
                            id: w.id,
                            initialX: w.x,
                            initialY: w.y,
                            width: w.w,
                            height: w.h,
                            zIndex: w.z,
                            onFocus: focus,
                            onClose: close,
                            onMinimize: minimize,
                            entryDelay: w.entryDelay || 0,
                        };
                        if (w.type === "safari")
                            return <SafariWindow key={w.id} {...commonProps} />;
                        if (w.type === "notes")
                            return <NotesWindow key={w.id} {...commonProps} />;
                        if (w.type === "finder")
                            return (
                                <FinderWindow
                                    key={w.id}
                                    {...commonProps}
                                    folderId={w.folderId}
                                    onOpenFile={openFile}
                                />
                            );
                        if (w.type === "textedit")
                            return (
                                <TextEditWindow
                                    key={w.id}
                                    {...commonProps}
                                    doc={w.doc}
                                    name={w.name}
                                />
                            );
                        if (w.type === "preview-image")
                            return (
                                <ImagePreviewWindow
                                    key={w.id}
                                    {...commonProps}
                                    src={w.src}
                                    name={w.name}
                                />
                            );
                        if (w.type === "spotify-card")
                            return (
                                <SpotifyCard
                                    key={w.id}
                                    {...commonProps}
                                    variant={w.variant}
                                />
                            );
                        return null;
                    })}
            </AnimatePresence>

            <Dock
                onItemClick={handleDockClick}
                runningIds={runningIds}
                istDay={istDate.day}
                istWeekday={istDate.weekday}
            />

            <AnimatePresence>
                {preview && (
                    <FilePreview
                        file={preview.file}
                        onClose={() => setPreview(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {contactCardOpen && (
                    <BusinessCardOverlay onClose={() => setContactCardOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
