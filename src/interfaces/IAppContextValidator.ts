import { AppContext } from "@app-root/AppContext";

export interface IAppContextValidator {
    validate(context: AppContext): boolean;
}