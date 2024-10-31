import { AppContext } from "@app-context";
import { DependencyInjection } from "@app-base/DependencyInjection";

export const isValidContext = (context: any): context is AppContext => {
    const contextChecks: boolean[] = [
        typeof context !== "undefined",
        context !== undefined,
        context !== null,
        context.dependencyInjection instanceof DependencyInjection
    ];
    return contextChecks.every(x => x);
};