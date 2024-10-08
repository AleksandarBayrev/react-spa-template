import { enhanceClass } from "../base";
import { IRoutesProvider } from "../interfaces";
import { Routes as RoutesConstants } from "../constants";

export class RoutesProvider implements IRoutesProvider {
    private readonly _routes: RoutesConstants[];

    constructor(routes: RoutesConstants[]) {
        this._routes = this.parseRoutes(routes);
    }

    get routes(): RoutesConstants[] {
        return this._routes;
    }

    private parseRoutes(routes: RoutesConstants[]) {
        if (!routes.includes(RoutesConstants["/404"])) {
            throw new Error("Please provide a `/404` route!");
        }
        return routes;
    }
}

enhanceClass(RoutesProvider, "RoutesProvider");