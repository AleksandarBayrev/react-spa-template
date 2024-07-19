import React from "react";
import { IBrowserHistoryManager, IFormStore, IMessageBus, IPageRenderer, IUrlParser, IObserverStorage, IFormPageObserverStorage } from "../interfaces";
import { BrowserHistoryManager, MessageBus, PageRenderer, UrlParser, FormPageObserverStorage } from "../services";
import { IAppStore } from "../interfaces";
import { AppStore, FormStore } from "../stores";
import { DependencyInjection } from "../base";
import { setupPageRenderer } from "./setupPageRenderer";
import { setupMessageBus } from "./setupMessageBus";

export const setupDependencyInjection = async () => {
    DependencyInjection.setupInstance(console.log, false);
    DependencyInjection.getInstance().registerService<IMessageBus>("IMessageBus", "singleton", MessageBus, []);
    DependencyInjection.getInstance().registerService<IUrlParser>("IUrlParser", "singleton", UrlParser, []);
    DependencyInjection.getInstance().registerService<IBrowserHistoryManager>("IBrowserHistoryManager", "singleton", BrowserHistoryManager, []);
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
    DependencyInjection.getInstance().registerService<IPageRenderer>("IPageRenderer", "singleton", PageRenderer, []);
    //#region Configure services
    await setupMessageBus();
    setupPageRenderer();
    //#endregion
}