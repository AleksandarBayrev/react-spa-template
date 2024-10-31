import React from "react";
import { createBrowserHistory } from "history";
import { IBrowserHistoryManager, IFormStore, IMessageBus, IPageRenderer, IUrlParser, IFormPageObserverStorage, IRoutesProvider, IAppStore } from "@app-interfaces";
import { BrowserHistoryManager, MessageBus, PageRenderer, UrlParser, FormPageObserverStorage, RoutesProvider } from "@app-services";
import { AppStore, FormStore } from "@app-stores";
import { DependencyInjection } from "@app-base";
import { Routes as RoutesConstants } from "@app-constants";
import { setupPageRenderer } from "./setupPageRenderer";
import { setupMessageBus } from "./setupMessageBus";

export const setupDependencyInjection = async () => {
    DependencyInjection.setupInstance(console.log, false);
    DependencyInjection.getInstance().registerService<IMessageBus>("IMessageBus", "singleton", MessageBus, []);
    DependencyInjection.getInstance().registerService<IUrlParser>("IUrlParser", "singleton", UrlParser, []);
    DependencyInjection.getInstance().registerService<IBrowserHistoryManager>("IBrowserHistoryManager", "singleton", BrowserHistoryManager, [
        createBrowserHistory()
    ]);
    DependencyInjection.getInstance().registerService<IFormPageObserverStorage>("IFormPageObserverStorage", "singleton", FormPageObserverStorage, []);
    DependencyInjection.getInstance().registerService<IAppStore>("IAppStore", "singleton", AppStore, [
        DependencyInjection.getInstance().getService<IBrowserHistoryManager>("IBrowserHistoryManager")
    ]);
    DependencyInjection.getInstance().registerService<IFormStore>("IFormStore", "singleton", FormStore, [
        DependencyInjection.getInstance().getService<IAppStore>("IAppStore"),
        DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus"),
        DependencyInjection.getInstance().getService<IUrlParser>("IUrlParser"),
        DependencyInjection.getInstance().getService<IBrowserHistoryManager>("IBrowserHistoryManager"),
    ]);
    DependencyInjection.getInstance().registerService<IPageRenderer>("IPageRenderer", "singleton", PageRenderer, [RoutesConstants["/404"]]);
    DependencyInjection.getInstance().registerService<IRoutesProvider>("IRoutesProvider", "singleton", RoutesProvider, [[
        RoutesConstants["/"],
        RoutesConstants["/about"],
        RoutesConstants["/form"],
        RoutesConstants["/404"]
    ]]);
    //#region Configure services
    await setupMessageBus();
    setupPageRenderer();
    //#endregion
}