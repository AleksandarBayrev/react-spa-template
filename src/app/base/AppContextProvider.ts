import { AppContext } from "@app-root/AppContext";
import { Context, useContext } from "react";

export abstract class AppContextProvider {
    private constructor() {}

    public static getContext = (context: Context<AppContext | undefined>): AppContext => {
        if (!AppContextProvider.validateParent(context)) {
            throw new Error("Invalid context, please check index.tsx!");
        }
        const ctx = useContext(context);
        if (!AppContextProvider.validateContext(ctx)) {
            throw new Error("Invalid context, please check index.tsx!");
        }
        return ctx;
    }

    private static getValidationsForParent = (context: Context<AppContext | undefined>) => ([
        context !== undefined,
        context !== null,
    ]);

    private static getValidationsForContext = (context: AppContext | undefined) => ([
        context !== undefined,
        context !== null,
    ]);

    private static validateParent = (context: Context<AppContext | undefined>): context is Context<AppContext | undefined> => {
        return AppContextProvider.getValidationsForParent(context).every(x => x);
    }

    private static validateContext = (context: AppContext | undefined): context is AppContext => {
        return AppContextProvider.getValidationsForContext(context).every(x => x);
    }
}