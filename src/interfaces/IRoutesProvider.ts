import { Routes as RoutesConstants } from "../constants";

export interface IRoutesProvider {
    get routes(): RoutesConstants[];
}