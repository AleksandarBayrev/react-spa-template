import { ReactElement, JSXElementConstructor } from "react";
import { IPageRenderer } from "../interfaces/IPageRenderer";
import { enhanceClass } from "../base";
import { Routes } from "../constants";

export class PageRenderer implements IPageRenderer {
    private readonly pageMaps: Map<string, React.ReactElement>;

    constructor() {
        this.pageMaps = new Map();
    }

    addPage(route: string, element: React.ReactElement) {
        this.pageMaps.set(route, element);
    }
    renderPage(route: string): ReactElement<any, string | JSXElementConstructor<any>> {
        const page = this.pageMaps.get(route);
        if (!page) {
            console.warn(`Page for route: ${route} is not registered, rendering 404 page!`);
            return this.pageMaps.get(Routes["/404"])!;
        }
        return page;
    }
}

enhanceClass(PageRenderer, "PageRenderer");