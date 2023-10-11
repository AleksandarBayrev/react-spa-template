import React from "react";
import { DependencyInjection } from "../base";
import { IPageRenderer } from "../interfaces";
import { HomePage, AboutPage, PageNotFound } from "../pages";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage("/", <HomePage />);
    pageRenderer.addPage("/about", <AboutPage />);
    pageRenderer.addPage("/404", <PageNotFound dependencyInjection={DependencyInjection.getInstance()} />);
}