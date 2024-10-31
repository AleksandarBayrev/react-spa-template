import { AppContext } from "@app-context";
import { isValidContext } from "@app-base/helpers/isValidContext";

export const getContext = (context: unknown | undefined): AppContext => {
    if (!isValidContext(context)) {
        throw new Error("AppContext not provided!");
    }
    return context;
}