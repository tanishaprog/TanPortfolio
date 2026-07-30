import React from "react";

/**
 * Warm gradient placeholder wallpaper.
 * To replace: drop a file named `wallpaper.jpg` in /app/frontend/public/
 * and set showCustom=true in Desktop, or just replace this component.
 */
export default function Wallpaper({ customUrl = null }) {
    if (customUrl) {
        return (
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${customUrl})` }}
                data-testid="wallpaper-custom"
            />
        );
    }
    return <div className="wallpaper" data-testid="wallpaper-placeholder" />;
}
