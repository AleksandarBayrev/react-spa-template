import React from "react";
import { DependencyInjection } from "../base";
import { IPageRenderer } from "../interfaces";
import { HomePage, AboutPage, PageNotFound, FormPage } from "../pages";
import { Routes } from "../constants";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage(Routes["/"], <HomePage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage(Routes["/about"], <AboutPage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage(Routes["/form"], <FormPage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage(Routes["/404"], <PageNotFound dependencyInjection={DependencyInjection.getInstance()} />);
}