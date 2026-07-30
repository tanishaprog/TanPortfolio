import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Draggable, focusable macOS-style window.
 * - `titleBar` prop renders inside the top bar (traffic lights are added automatically).
 * - Children render as the window body.
 */
export default function Window({
    id,
    title,
    children,
    initialX = 120,
    initialY = 90,
    width = 900,
    height = 600,
    zIndex = 10,
    onClose,
    onMinimize,
    onFocus,
    icon = null,
    testid,
    minWidth = 480,
    minHeight = 320,
    titleBarExtras = null,
    className = "",
    bodyClassName = "",
    accent = null,
    entryDelay = 0,
}) {
    const [size, setSize] = useState({ w: width, h: height });
    const [pos, setPos] = useState({ x: initialX, y: initialY });
    const containerRef = useRef(null);

    useEffect(() => {
        setSize({ w: width, h: height });
    }, [width, height]);

    // Clamp within viewport on mount / resize
    useEffect(() => {
        const clamp = () => {
            setPos((p) => ({
                x: Math.min(Math.max(0, p.x), Math.max(0, window.innerWidth - 240)),
                y: Math.min(Math.max(26, p.y), Math.max(26, window.innerHeight - 120)),
            }));
        };
        window.addEventListener("resize", clamp);
        return () => window.removeEventListener("resize", clamp);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            drag
            dragMomentum={false}
            dragElastic={0}
            dragListener={false}
            initial={{ opacity: 0, scale: 0.965, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{
                duration: 0.42,
                ease: EASE,
                delay: entryDelay,
            }}
            onMouseDown={() => onFocus?.(id)}
            style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: size.w,
                height: size.h,
                zIndex,
            }}
            className={`mac-window ${className}`}
            data-testid={testid || `window-${id}`}
        >
            {/* Title bar (draggable) */}
            <div
                className="mac-titlebar flex items-center px-3 gap-3 cursor-default relative"
                onPointerDown={(e) => {
                    // Enable drag from titlebar via framer motion
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const originX = pos.x;
                    const originY = pos.y;
                    const move = (ev) => {
                        setPos({
                            x: Math.max(0, originX + (ev.clientX - startX)),
                            y: Math.max(26, originY + (ev.clientY - startY)),
                        });
                    };
                    const up = () => {
                        window.removeEventListener("pointermove", move);
                        window.removeEventListener("pointerup", up);
                    };
                    window.addEventListener("pointermove", move);
                    window.addEventListener("pointerup", up);
                }}
                data-testid={`${testid || `window-${id}`}-titlebar`}
            >
                <div className="traffic-lights flex items-center gap-2 pl-0.5">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose?.(id);
                        }}
                        className="traffic-light"
                        style={{ background: "#ff5f57", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }}
                        aria-label="Close"
                        data-testid={`${testid || `window-${id}`}-close`}
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 1 L5 5 M5 1 L1 5" stroke="#4d0000" strokeWidth="1" strokeLinecap="round"/></svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onMinimize?.(id);
                        }}
                        className="traffic-light"
                        style={{ background: "#febc2e", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }}
                        aria-label="Minimize"
                        data-testid={`${testid || `window-${id}`}-minimize`}
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 3 H5" stroke="#663d00" strokeWidth="1" strokeLinecap="round"/></svg>
                    </button>
                    <span
                        className="traffic-light"
                        style={{ background: "#28c840", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }}
                        aria-label="Zoom (disabled)"
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 3 L3 1 L3 3 Z M5 3 L3 5 L3 3 Z" fill="#003300" /></svg>
                    </span>
                </div>

                <div className="flex-1 flex items-center justify-center gap-2 text-[13px] text-[#3a3a3d] font-semibold select-none tracking-tight">
                    {icon}
                    <span className="truncate max-w-[60%]">{title}</span>
                </div>

                <div className="min-w-[70px] flex items-center justify-end">
                    {titleBarExtras}
                </div>
            </div>

            {/* Body */}
            <div
                className={`h-[calc(100%-38px)] w-full ${bodyClassName}`}
                data-testid={`${testid || `window-${id}`}-body`}
            >
                {children}
            </div>

            {accent}
        </motion.div>
    );
}
