import { Routes as RoutesConstants } from "@app-constants";

export interface IRoutesProvider {
    get routes(): RoutesConstants[];
}