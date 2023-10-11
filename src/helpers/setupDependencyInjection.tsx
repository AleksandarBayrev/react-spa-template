import React from "react";
import { IFormStore, IMessageBus, IPageRenderer, IRouteManager } from "../interfaces";
import { MessageBus, PageRenderer, RouteManager } from "../services";
import { IAppStore } from "../interfaces";
import { AppStore, FormStore } from "../stores";
import { DependencyInjection } from "../base";
import { setupPageRenderer } from "./setupPageRenderer";
import { setupMessageBus } from "./setupMessageBus";

export const setupDependencyInjection = async () => {
    DependencyInjection.setupInstance(console.log);
    DependencyInjection.getInstance().registerService<IMessageBus>("IMessageBus", "singleton", MessageBus, []);
    DependencyInjection.getInstance().registerService<IRouteManager>("IRouteManager", "singleton", RouteManager, []);
    DependencyInjection.getInstance().registerService<IAppStore>("IAppStore", "singleton", AppStore, []);
    DependencyInjection.getInstance().registerService<IFormStore>("IFormStore", "singleton", FormStore, [
        DependencyInjection.getInstance().getService<IAppStore>("IAppStore"),
        DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus")
    ]);
    DependencyInjection.getInstance().registerService<IPageRenderer>("IPageRenderer", "singleton", PageRenderer, []);
    //#region Configure services
    await setupMessageBus();
    setupPageRenderer();
    //#endregion
}