import React from "react";
import { IPageRenderer, IRouteManager } from "../interfaces";
import { PageRenderer, RouteManager } from "../services";
import { IAppStore } from "../interfaces";
import { AppStore } from "../stores";
import { DependencyInjection } from "../base";
import { AboutPage, HomePage, PageNotFound } from "../pages";

export const setupDependencyInjection = () => {
    DependencyInjection.setupInstance(console.log);
    DependencyInjection.getInstance().registerService<IRouteManager>("IRouteManager", "singleton", RouteManager, []);
    DependencyInjection.getInstance().registerService<IAppStore>("IAppStore", "singleton", AppStore, [DependencyInjection.getInstance().getService<IRouteManager>("IRouteManager")]);
    DependencyInjection.getInstance().registerService<IPageRenderer>("IPageRenderer", "singleton", PageRenderer, []);
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage("/", <HomePage />);
    pageRenderer.addPage("/about", <AboutPage />);
    pageRenderer.addPage("/404", <PageNotFound dependencyInjection={DependencyInjection.getInstance()} />);
}