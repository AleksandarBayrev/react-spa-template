import React from "react";
import { DependencyInjection } from "../base";
import { IPageRenderer } from "../interfaces";
import { HomePage, AboutPage, PageNotFound, FormPage } from "../pages";
import { Routes } from "../constants";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage(Routes["/"], <HomePage />);
    pageRenderer.addPage(Routes["/about"], <AboutPage />);
    pageRenderer.addPage(Routes["/form"], <FormPage />);
    pageRenderer.addPage(Routes["/404"], <PageNotFound />);
}