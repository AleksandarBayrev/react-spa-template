import React from "react";
import { Routes as RoutesConstants } from "../constants";

export type RouteDefinition = {
    path: RoutesConstants;
    element: React.ReactElement<any, any>;
}