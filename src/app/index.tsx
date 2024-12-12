import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { setupDependencyInjection } from "./base/setupDependencyInjection";
import { DependencyInjection } from "./base";
import { AppContext } from "./AppContext";

(async () => {
    DependencyInjection.setupInstance(console.log, false);
    const DI = DependencyInjection.getInstance();
    await setupDependencyInjection(DI);
    const rootElement = document.getElementById("root");
    if (!rootElement) {
        throw new Error("HTML element with id: root is not found!");
    }
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <AppContext.Provider value={
                {
                    DependencyInjection: DI
                }
            }>
                <App />
            </AppContext.Provider>
        </React.StrictMode>
    );
})();