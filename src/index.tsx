import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { DependencyInjection } from "./base";
import { setupDependencyInjection } from "./helpers";

setupDependencyInjection();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App dependencyInjection={DependencyInjection.getInstance()} />
    </React.StrictMode>
);