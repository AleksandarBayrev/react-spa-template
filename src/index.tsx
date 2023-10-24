import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { DependencyInjection } from "./base";
import { setupDependencyInjection } from "./helpers";

(async () => {
    const root = ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
    );

    await setupDependencyInjection();

    root.render(
        <React.StrictMode>
            <App dependencyInjection={DependencyInjection.getInstance()} />
        </React.StrictMode>
    );
})();