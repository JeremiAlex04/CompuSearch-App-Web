import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { MarginTop } from "./utils/MarginTop";
import AuthToast from "./components/auth/AuthToast";
import ScrollToTop from "./utils/ScrollToTop";
import MockInfoModal from "./components/MockInfoModal";

import "./css/App.css"

const App = () => {
    useEffect(() => {
        MarginTop();
        window.addEventListener("resize", MarginTop);
        return () => window.removeEventListener("resize", MarginTop);
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <MockInfoModal />
            <AuthToast />
            <AppRoute />
        </BrowserRouter>
    );
};

export default App;
