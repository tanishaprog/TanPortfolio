import React from "react";
import "@/App.css";
import Desktop from "./components/Desktop";
import MobileSafari from "./components/MobileSafari";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
    const isMobile = useIsMobile();
    return (
        <div className="App w-full h-full">
            {isMobile ? <MobileSafari /> : <Desktop />}
        </div>
    );
}

export default App;
