import { AppContext } from "../../AppContext";
import { DependencyInjection } from "../DependencyInjection";

export const isValidContext = (context: any): context is AppContext => {
    const contextChecks: boolean[] = [
        typeof context !== "undefined",
        context !== undefined,
        context !== null,
        context.dependencyInjection instanceof DependencyInjection
    ];
    return contextChecks.every(x => x);
};