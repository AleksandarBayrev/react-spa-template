import { ReactElement, JSXElementConstructor } from "react";
import { IPageRenderer } from "../interfaces/IPageRenderer";
import { enhanceClass } from "../base";

export class PageRenderer implements IPageRenderer {
    private readonly pageMaps: Map<string, React.ReactElement>;
    private readonly routes: {[key: string]: string}

    constructor(routes: {[key: string]: string}) {
        this.pageMaps = new Map();
        this.routes = this.parseRoutes(routes);
    }

    addPage(route: string, element: React.ReactElement) {
        this.pageMaps.set(route, element);
    }

    renderPage(route: string): ReactElement<any, string | JSXElementConstructor<any>> {
        const page = this.pageMaps.get(route);
        if (!page) {
            console.warn(`Page for route: ${route} is not registered, rendering 404 page!`);
            return this.pageMaps.get(this.routes["/404"])!;
        }
        return page;
    }

    private parseRoutes(routes: {[key: string]: string}) {
        if (typeof routes["/404"] !== "string") {
            throw new Error("Please provide a `/404` route!");
        }
        return routes;
    }
}

enhanceClass(PageRenderer, "PageRenderer");