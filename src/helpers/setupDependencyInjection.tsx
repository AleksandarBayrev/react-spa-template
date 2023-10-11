import React from "react";
import { IPageRenderer, IRouteManager } from "../interfaces";
import { PageRenderer, RouteManager } from "../services";
import { IAppStore } from "../interfaces";
import { AppStore } from "../stores";
import { DependencyInjection } from "../base";
import { setupPageRenderer } from "./setupPageRenderer";

export const setupDependencyInjection = () => {
    DependencyInjection.setupInstance(console.log);
    DependencyInjection.getInstance().registerService<IRouteManager>("IRouteManager", "singleton", RouteManager, []);
    DependencyInjection.getInstance().registerService<IAppStore>("IAppStore", "singleton", AppStore, [DependencyInjection.getInstance().getService<IRouteManager>("IRouteManager")]);
    DependencyInjection.getInstance().registerService<IPageRenderer>("IPageRenderer", "singleton", PageRenderer, []);
    //#region Configure services
    setupPageRenderer();
    //#endregion
}