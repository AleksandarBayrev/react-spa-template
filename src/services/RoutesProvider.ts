import { enhanceClass } from "../base";
import { IRoutesProvider } from "../interfaces";
import { Routes as RoutesConstants } from "../constants";

export class RoutesProvider implements IRoutesProvider {
    private readonly _routes: RoutesConstants[];

    constructor(routes: RoutesConstants[]) {
        this._routes = routes;
    }

    get routes(): RoutesConstants[] {
        return this._routes;
    }
}

enhanceClass(RoutesProvider, "RoutesProvider");