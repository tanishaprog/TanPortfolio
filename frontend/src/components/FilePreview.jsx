import React from "react";
import { motion } from "framer-motion";
import { X, FileText, Download } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

// A tiny "Preview" style modal shown when a file (like Final Resume.pdf) is opened
// from a Finder window. Real content will be dropped in later.
export default function FilePreview({ file, onClose }) {
    return (
        <motion.div
            className="absolute inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid={`file-preview-${file.name}`}
        >
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="relative z-10 w-[min(560px,94%)] rounded-2xl bg-[#2a2a2c] text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden"
            >
                <div className="h-9 border-b border-white/10 flex items-center px-3 gap-2">
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-[#ff5f57]"
                        aria-label="Close"
                        data-testid="file-preview-close"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
                    <div className="flex-1 text-center text-[12px] text-white/70 font-medium">
                        Preview — {file.name}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close preview"
                        className="text-white/60 hover:text-white/90"
                    >
                        <X size={13} />
                    </button>
                </div>

                <div className="p-8 bg-[#1e1e20]">
                    <div className="mx-auto w-full aspect-[8.5/11] max-h-[420px] bg-white rounded-md shadow-inner flex flex-col items-center justify-center gap-3 text-[#3a3a3d]">
                        <FileText size={40} strokeWidth={1.2} className="text-[#8a8a8f]" />
                        <div className="serif text-[22px] text-[#1c1c1e]">
                            Final Resume.pdf
                        </div>
                        <div className="text-[12.5px] text-[#8a8a8f] text-center px-8">
                            Placeholder. Tanisha will upload the real resume
                            file — it will replace this preview.
                        </div>
                        <button className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] bg-black text-white hover:bg-[#3a3a3d]">
                            <Download size={12} /> Download (soon)
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
