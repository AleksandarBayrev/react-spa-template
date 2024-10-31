import React from "react";
import { Routes as RoutesConstants } from "@app-constants";

export type RouteDefinition = {
    path: RoutesConstants;
    element: React.ReactElement<any, any>;
}