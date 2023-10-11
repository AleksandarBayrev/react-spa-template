import React from "react";
import { DependencyInjection } from "../base";
import { IPageRenderer } from "../interfaces";
import { HomePage, AboutPage, PageNotFound } from "../pages";
import { FormPage } from "../pages/FormPage";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage("/", <HomePage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage("/about", <AboutPage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage("/form", <FormPage dependencyInjection={DependencyInjection.getInstance()} />);
    pageRenderer.addPage("/404", <PageNotFound dependencyInjection={DependencyInjection.getInstance()} />);
}