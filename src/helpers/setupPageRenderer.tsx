import React from "react";
import { DependencyInjection } from "@app-base";
import { IPageRenderer } from "@app-interfaces";
import { HomePage, AboutPage, PageNotFound, FormPage } from "@app-pages";
import { Routes } from "@app-constants";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage(Routes["/"], <HomePage />);
    pageRenderer.addPage(Routes["/about"], <AboutPage />);
    pageRenderer.addPage(Routes["/form"], <FormPage />);
    pageRenderer.addPage(Routes["/404"], <PageNotFound />);
}