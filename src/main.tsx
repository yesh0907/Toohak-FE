import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // Uncomment StrictMode if you don't want app to re-render twice
    <React.StrictMode>
        <Routes />
    </React.StrictMode>
);
