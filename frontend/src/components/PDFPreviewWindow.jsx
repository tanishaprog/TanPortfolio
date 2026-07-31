import React from "react";
import Window from "./Window";
import { Share, Info, ExternalLink } from "lucide-react";

// Preview.app-style PDF viewer. Renders the PDF via <iframe> (native browser
// viewer) with a small "Open in Drive" fallback link in the corner.
export default function PDFPreviewWindow({ src, name, driveUrl, ...props }) {
    return (
        <Window
            {...props}
            testid={`pdf-preview-${name}`}
            title={name}
            width={props.width ?? 780}
            height={props.height ?? 820}
            className="!bg-[#2b2b2d]"
            bodyClassName="bg-[#1e1e20]"
            titleBarExtras={
                <div className="flex items-center gap-3 text-[#8a8a8f]">
                    {driveUrl && (
                        <a
                            href={driveUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            data-testid="pdf-open-external"
                            aria-label="Open in Drive"
                            className="hover:text-[#0a84ff]"
                        >
                            <ExternalLink size={13} />
                        </a>
                    )}
                    <Share size={13} />
                    <Info size={13} />
                </div>
            }
        >
            <div className="w-full h-full bg-[#1e1e20] p-3">
                <iframe
                    title={name}
                    src={src + "#toolbar=0&navpanes=0"}
                    className="w-full h-full rounded-md bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.55)]"
                    style={{ border: 0 }}
                    data-testid="pdf-iframe"
                />
            </div>
        </Window>
    );
}
