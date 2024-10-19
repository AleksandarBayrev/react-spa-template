import { AppContext } from "../../AppContext";
import { isValidContext } from "./isValidContext";

export const getContext = (context: unknown | undefined): AppContext => {
    if (!isValidContext(context)) {
        throw new Error("AppContext not provided!");
    }
    return context;
}