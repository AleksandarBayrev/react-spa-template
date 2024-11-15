import { AppContext } from "@app-root/AppContext";
import { DependencyInjection } from "@app-root/base";

export abstract class AppContextProvider {
    private constructor() {}

    public static getContext = (context: AppContext | undefined): AppContext => {
        if (!AppContextProvider.validate(context)) {
            throw new Error("Invalid context, please check index.tsx!");
        }
        return context;
    }

    private static getValidations = (context: AppContext | undefined) => ([
        context !== undefined,
        context !== null,
        context && context.DependencyInjection instanceof DependencyInjection
    ]);

    private static validate = (context: AppContext | undefined): context is AppContext => {
        return AppContextProvider.getValidations(context).every(x => x);
    }
}