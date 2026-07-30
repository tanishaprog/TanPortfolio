import React, { useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
} from "framer-motion";
import {
    FolderSearch,
    Compass,
    StickyNote,
    Image as ImageIcon,
    Music,
    MessageSquare,
    Calendar,
    Mail,
    Sparkles,
    Trash2,
    BookOpen,
} from "lucide-react";

// Dock items — using Lucide icons stylised inside colored tiles to feel native.
const DOCK_ITEMS = [
    { id: "finder", label: "Finder", tile: "gradient-blue", Icon: FolderSearch },
    { id: "safari", label: "Safari", tile: "gradient-cyan", Icon: Compass, focus: "safari" },
    { id: "notes", label: "Notes", tile: "gradient-yellow", Icon: StickyNote, focus: "notes" },
    { id: "photos", label: "Photos", tile: "gradient-pink", Icon: ImageIcon },
    { id: "spotify", label: "Spotify", tile: "gradient-green", Icon: Music },
    { id: "chatgpt", label: "ChatGPT", tile: "gradient-graphite", Icon: Sparkles },
    { id: "calendar", label: "Calendar", tile: "gradient-white", Icon: Calendar },
    { id: "mail", label: "Mail", tile: "gradient-sky", Icon: Mail },
    { id: "messages", label: "Messages", tile: "gradient-lime", Icon: MessageSquare },
    { id: "substack", label: "Substack", tile: "gradient-orange", Icon: BookOpen },
    { id: "trash", label: "Trash", tile: "gradient-graphite", Icon: Trash2, focus: "trash" },
];

const TILE_CLASSES = {
    "gradient-blue":
        "bg-[linear-gradient(160deg,#5aa9ff_0%,#0a67c8_100%)] text-white",
    "gradient-cyan":
        "bg-[linear-gradient(160deg,#8ee6ff_0%,#1a89b8_100%)] text-white",
    "gradient-yellow":
        "bg-[linear-gradient(180deg,#fff4b3_0%,#f7c948_100%)] text-[#7a5a00]",
    "gradient-pink":
        "bg-[linear-gradient(160deg,#ffb7c5_0%,#d24b7a_100%)] text-white",
    "gradient-green":
        "bg-[linear-gradient(160deg,#1ed760_0%,#0b8b3e_100%)] text-white",
    "gradient-graphite":
        "bg-[linear-gradient(160deg,#3c3c3e_0%,#111113_100%)] text-white",
    "gradient-white":
        "bg-[linear-gradient(180deg,#ffffff_0%,#e8e8ea_100%)] text-[#c72c2c] border border-black/5",
    "gradient-sky":
        "bg-[linear-gradient(160deg,#8fd9ff_0%,#2f78ff_100%)] text-white",
    "gradient-lime":
        "bg-[linear-gradient(160deg,#a4f07b_0%,#1a9d3d_100%)] text-white",
    "gradient-orange":
        "bg-[linear-gradient(160deg,#ffc07a_0%,#e05c1a_100%)] text-white",
};

function DockItem({ item, mouseX, onClick, isRunning }) {
    const ref = useRef(null);
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });
    // Native macOS-ish magnification curve
    const sizeSpring = useSpring(
        useTransform(distance, [-140, 0, 140], [52, 78, 52]),
        { mass: 0.1, stiffness: 220, damping: 20 },
    );

    const { Icon } = item;

    return (
        <motion.button
            ref={ref}
            onClick={() => onClick?.(item)}
            style={{ width: sizeSpring, height: sizeSpring }}
            className="relative flex items-center justify-center group"
            data-testid={`dock-${item.id}`}
            aria-label={item.label}
        >
            <span
                className={`absolute -top-9 px-2.5 py-1 rounded-md text-[12px] font-medium text-white bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap`}
            >
                {item.label}
            </span>
            <span
                className={`w-full h-full rounded-[16px] shadow-[0_6px_14px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-150 group-active:scale-95 ${TILE_CLASSES[item.tile]}`}
            >
                <Icon size={30} strokeWidth={2} />
            </span>
            {isRunning && (
                <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-white/85 shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            )}
        </motion.button>
    );
}

export default function Dock({ onItemClick, runningIds = [] }) {
    const mouseX = useMotionValue(Infinity);

    return (
        <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[8000]"
            data-testid="dock"
        >
            <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="dock flex items-end gap-1.5 px-3 pt-2 pb-2"
            >
                {DOCK_ITEMS.map((item, i) => (
                    <React.Fragment key={item.id}>
                        {i === DOCK_ITEMS.length - 1 && (
                            <div className="w-px h-12 self-center bg-white/40 mx-1" />
                        )}
                        <DockItem
                            item={item}
                            mouseX={mouseX}
                            onClick={onItemClick}
                            isRunning={runningIds.includes(item.id)}
                        />
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
}
