import { enhanceClass } from "../base";
import { IRouteManager } from "../interfaces";

export class RouteManager implements IRouteManager {
    updateRoute(route: string) {
        window.history.replaceState([], "", route);
    }
}

enhanceClass(RouteManager, "RouteManager");