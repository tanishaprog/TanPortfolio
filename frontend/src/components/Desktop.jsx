import React, { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Wallpaper from "./Wallpaper";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import ContactCardIcon from "./ContactCardIcon";
import { StickyNoteWidget, PinterestWidget, SubstackWidget } from "./Widgets";
import SafariWindow from "./SafariWindow";
import NotesWindow from "./NotesWindow";
import FinderWindow from "./FinderWindow";
import FilePreview from "./FilePreview";
import AboutScatter from "./AboutScatter";
import TextEditWindow from "./TextEditWindow";
import ImagePreviewWindow from "./ImagePreviewWindow";
import SpotifyWindow from "./SpotifyWindow";
import BusinessCardWindow from "./BusinessCardWindow";
import { FOLDERS } from "../data/folders";

// A window has: id, type, folderId (for finder), z, minimized, plus type-specific fields.
const initialWindows = [
    { id: "safari", type: "safari", z: 3, minimized: false, x: 380, y: 54, w: 1080, h: 720 },
    { id: "notes", type: "notes", z: 4, minimized: false, x: 430, y: 100, w: 440, h: 340 },
];

export default function Desktop() {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [windows, setWindows] = useState(initialWindows);
    const [zCounter, setZCounter] = useState(10);
    const [preview, setPreview] = useState(null);
    const [aboutOpen, setAboutOpen] = useState(false);

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

    // Push a window with a stable id (focus + un-minimize if it already exists)
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

    const openFolder = useCallback(
        (folderId) => {
            // About Me is a special interaction — it scatters files onto the
            // desktop instead of opening a Finder window.
            if (folderId === "about") {
                setAboutOpen(true);
                // Also minimize Safari & Notes so the scatter is visible
                setWindows((ws) =>
                    ws.map((w) =>
                        w.type === "safari" || w.type === "notes"
                            ? { ...w, minimized: true }
                            : w,
                    ),
                );
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
        [pushWindow, windows],
    );

    const openFile = useCallback((folder, file) => {
        if (!file.openable) return;
        setPreview({ folder: folder.id, file });
    }, []);

    // Open a scattered About Me file → spawn the appropriate window
    const openScatterItem = useCallback(
        (item) => {
            if (item.kind === "image") {
                pushWindow({
                    id: `preview-${item.id}`,
                    type: "preview-image",
                    src: item.src,
                    name: item.label,
                    x: 260 + Math.random() * 80,
                    y: 90 + Math.random() * 40,
                    w: 540,
                    h: 700,
                });
            } else if (item.kind === "text") {
                pushWindow({
                    id: `textedit-${item.docKind}`,
                    type: "textedit",
                    doc: item.docKind,
                    name: item.label,
                    x: 360 + Math.random() * 100,
                    y: 100 + Math.random() * 50,
                    w: 620,
                    h: 560,
                });
            } else if (item.kind === "spotify") {
                pushWindow({
                    id: "spotify",
                    type: "spotify",
                    x: 480,
                    y: 90,
                    w: 660,
                    h: 700,
                });
            }
        },
        [pushWindow],
    );

    const openContactCard = useCallback(() => {
        pushWindow({
            id: "business-card",
            type: "business-card",
            x: 400,
            y: 90,
            w: 760,
            h: 620,
        });
    }, [pushWindow]);

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
                if (w.type === "spotify") return "spotify";
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
                    onOpen={openContactCard}
                />
            </div>

            {/* Widgets: LEFT column — Substack (wide) → Pinterest → Sticky */}
            <div
                className="absolute left-5 top-9 flex flex-col gap-5 z-[10]"
                data-testid="desktop-widgets"
            >
                <SubstackWidget />
                <PinterestWidget />
                <StickyNoteWidget />
            </div>

            {/* Scattered About Me files (renders on top of windows with z=15) */}
            {aboutOpen && (
                <div className="absolute inset-0 z-[15]" data-testid="about-scatter-layer">
                    <AboutScatter onOpen={openScatterItem} />
                </div>
            )}

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
                        if (w.type === "spotify")
                            return <SpotifyWindow key={w.id} {...commonProps} />;
                        if (w.type === "business-card")
                            return <BusinessCardWindow key={w.id} {...commonProps} />;
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
        </div>
    );
}
