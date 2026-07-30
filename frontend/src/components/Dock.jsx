import React, { useMemo, useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
} from "framer-motion";
import {
    FinderIcon,
    SafariIcon,
    NotesIcon,
    PhotosIcon,
    MusicIcon,
    CalendarIcon,
    MailIcon,
    MessagesIcon,
    BooksIcon,
    SubstackIcon,
    ChatGPTIcon,
    TrashIcon,
} from "./DockIcons";

function DockItem({ item, mouseX, onClick, isRunning }) {
    const ref = useRef(null);
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });
    const sizeSpring = useSpring(
        useTransform(distance, [-150, 0, 150], [52, 82, 52]),
        { mass: 0.1, stiffness: 220, damping: 20 },
    );

    const { Icon, extra = {} } = item;

    return (
        <motion.button
            ref={ref}
            onClick={() => onClick?.(item)}
            style={{ width: sizeSpring, height: sizeSpring }}
            className="relative flex items-end justify-center group"
            data-testid={`dock-${item.id}`}
            aria-label={item.label}
        >
            <span
                className="absolute -top-9 px-2.5 py-1 rounded-md text-[12px] font-medium text-white bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap"
            >
                {item.label}
            </span>
            <motion.span
                style={{ width: sizeSpring, height: sizeSpring }}
                className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.28)] transition-transform duration-150 group-active:scale-90 flex items-end justify-center"
            >
                <Icon size="100%" {...extra} />
            </motion.span>
            {isRunning && (
                <span className="absolute -bottom-2 w-[5px] h-[5px] rounded-full bg-black/70" />
            )}
        </motion.button>
    );
}

export default function Dock({ onItemClick, runningIds = [], istDay = 30, istWeekday = "THU" }) {
    const mouseX = useMotionValue(Infinity);

    const items = useMemo(
        () => [
            { id: "finder", label: "Finder", Icon: FinderIcon },
            { id: "safari", label: "Safari", Icon: SafariIcon },
            { id: "notes", label: "Notes", Icon: NotesIcon },
            { id: "photos", label: "Photos", Icon: PhotosIcon },
            { id: "spotify", label: "Music", Icon: MusicIcon },
            { id: "chatgpt", label: "ChatGPT", Icon: ChatGPTIcon },
            {
                id: "calendar",
                label: "Calendar",
                Icon: CalendarIcon,
                extra: { day: istDay, weekday: istWeekday },
            },
            { id: "mail", label: "Mail", Icon: MailIcon },
            { id: "messages", label: "Messages", Icon: MessagesIcon },
            { id: "books", label: "Books", Icon: BooksIcon },
            { id: "substack", label: "Substack", Icon: SubstackIcon },
            { id: "trash", label: "Trash", Icon: TrashIcon },
        ],
        [istDay, istWeekday],
    );

    return (
        <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[8000]"
            data-testid="dock"
        >
            <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="dock flex items-end gap-1.5 px-3 pt-2 pb-2"
            >
                {items.map((item, i) => (
                    <React.Fragment key={item.id}>
                        {i === items.length - 1 && (
                            <div className="w-px h-12 self-center bg-black/15 mx-1" />
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
