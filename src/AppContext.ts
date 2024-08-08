import React from "react";
import { DependencyInjection } from "./base";

type AppContextProps = {
    dependencyInjection: DependencyInjection;
};

export type AppContext = React.ContextType<React.Context<AppContextProps>>;

export const AppContext = React.createContext<AppContext | undefined>(undefined);