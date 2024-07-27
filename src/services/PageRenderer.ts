import { ReactElement, JSXElementConstructor } from "react";
import { IPageRenderer } from "../interfaces";
import { enhanceClass } from "../base";
import { Routes } from "../constants";

export class PageRenderer implements IPageRenderer {
    private readonly pageMaps: Map<string, React.ReactElement>;
    private readonly defaultRoute: Routes;

    constructor(defaultRoute: Routes) {
        this.pageMaps = new Map();
        this.defaultRoute = defaultRoute;
    }

    addPage(route: string, element: React.ReactElement) {
        this.pageMaps.set(route, element);
    }

    renderPage(route: string): ReactElement<any, string | JSXElementConstructor<any>> {
        const page = this.pageMaps.get(route);
        if (!page) {
            console.warn(`Page for route: ${route} is not registered, rendering default page = ${this.defaultRoute}!`);
            return this.pageMaps.get(this.defaultRoute)!;
        }
        return page;
    }
}

enhanceClass(PageRenderer, "PageRenderer");