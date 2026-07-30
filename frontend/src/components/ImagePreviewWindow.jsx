import React from "react";
import Window from "./Window";
import { Share, RotateCw, Info } from "lucide-react";

// A Preview.app style window that just displays an image full-bleed.
export default function ImagePreviewWindow({ src, name, ...props }) {
    return (
        <Window
            {...props}
            testid={`preview-${name}`}
            title={name}
            width={props.width ?? 540}
            height={props.height ?? 700}
            className="!bg-[#2b2b2d]"
            bodyClassName="bg-[#1e1e20]"
            titleBarExtras={
                <div className="flex items-center gap-3 text-[#8a8a8f]">
                    <RotateCw size={13} />
                    <Share size={13} />
                    <Info size={13} />
                </div>
            }
        >
            <div className="w-full h-full flex items-center justify-center p-4">
                <img
                    src={src}
                    alt={name}
                    className="max-w-full max-h-full rounded-md shadow-[0_20px_40px_-10px_rgba(0,0,0,0.55)]"
                    draggable={false}
                    data-testid="preview-image"
                />
            </div>
        </Window>
    );
}
