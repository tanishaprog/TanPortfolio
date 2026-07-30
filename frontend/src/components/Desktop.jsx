import React, { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Wallpaper from "./Wallpaper";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import { StickyNoteWidget, PinterestWidget, SubstackWidget } from "./Widgets";
import SafariWindow from "./SafariWindow";
import NotesWindow from "./NotesWindow";
import FinderWindow from "./FinderWindow";
import FilePreview from "./FilePreview";
import { FOLDERS } from "../data/folders";

// A window has: id, type, folderId (for finder), z, minimized
const initialWindows = [
    { id: "safari", type: "safari", z: 3, minimized: false, x: 380, y: 54, w: 1080, h: 720 },
    { id: "notes", type: "notes", z: 4, minimized: false, x: 430, y: 100, w: 440, h: 340 },
];

export default function Desktop() {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [windows, setWindows] = useState(initialWindows);
    const [zCounter, setZCounter] = useState(10);
    const [preview, setPreview] = useState(null);

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

    const openFolder = useCallback(
        (folderId) => {
            const id = `finder-${folderId}`;
            setWindows((ws) => {
                if (ws.some((w) => w.id === id)) {
                    // already open — bring to front & un-minimize
                    const next = zCounter + 1;
                    setZCounter(next);
                    return ws.map((w) =>
                        w.id === id ? { ...w, z: next, minimized: false } : w,
                    );
                }
                const next = zCounter + 1;
                setZCounter(next);
                const idx = ws.filter((w) => w.type === "finder").length;
                return [
                    ...ws,
                    {
                        id,
                        type: "finder",
                        folderId,
                        z: next,
                        minimized: false,
                        x: 240 + idx * 30,
                        y: 110 + idx * 24,
                        w: 780,
                        h: 500,
                    },
                ];
            });
        },
        [zCounter],
    );

    const openFile = useCallback((folder, file) => {
        if (!file.openable) return;
        setPreview({ folder: folder.id, file });
    }, []);

    const handleDockClick = useCallback(
        (item) => {
            // If a window matches, focus/reopen
            const targetId =
                item.id === "safari"
                    ? "safari"
                    : item.id === "notes"
                      ? "notes"
                      : item.id === "trash"
                        ? "finder-trash"
                        : item.id === "finder"
                          ? "finder-about"
                          : null;
            if (!targetId) return;

            setWindows((ws) => {
                const exists = ws.some((w) => w.id === targetId);
                const next = zCounter + 1;
                setZCounter(next);
                if (exists) {
                    return ws.map((w) =>
                        w.id === targetId
                            ? { ...w, z: next, minimized: false }
                            : w,
                    );
                }
                if (targetId === "safari") {
                    return [
                        ...ws,
                        { id: "safari", type: "safari", z: next, minimized: false, x: 220, y: 60, w: 1000, h: 640 },
                    ];
                }
                if (targetId === "notes") {
                    return [
                        ...ws,
                        { id: "notes", type: "notes", z: next, minimized: false, x: 60, y: 120, w: 640, h: 440 },
                    ];
                }
                if (targetId === "finder-trash") {
                    return [
                        ...ws,
                        { id: "finder-trash", type: "finder", folderId: "trash", z: next, minimized: false, x: 280, y: 130, w: 720, h: 460 },
                    ];
                }
                if (targetId === "finder-about") {
                    return [
                        ...ws,
                        { id: "finder-about", type: "finder", folderId: "about", z: next, minimized: false, x: 280, y: 130, w: 780, h: 500 },
                    ];
                }
                return ws;
            });
        },
        [zCounter],
    );

    const runningIds = Array.from(
        new Set(
            windows.map((w) =>
                w.type === "safari"
                    ? "safari"
                    : w.type === "notes"
                      ? "notes"
                      : w.type === "finder"
                        ? "finder"
                        : null,
            ),
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

            {/* Right column: desktop folders */}
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
