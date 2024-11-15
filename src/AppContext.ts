import React from "react";
import { DependencyInjection } from "./base";

export type AppContext = {
    DependencyInjection: DependencyInjection;
};

export const AppContext = React.createContext<AppContext | undefined>(undefined);