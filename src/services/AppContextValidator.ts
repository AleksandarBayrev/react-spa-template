import { AppContext } from "@app-root/AppContext";
import { DependencyInjection } from "@app-root/base";
import { enhanceClass } from "@app-root/base/helpers";
import { IAppContextValidator } from "@app-root/interfaces";

export class AppContextValidator implements IAppContextValidator {
    private getValidations = (context: AppContext) => ([
        context !== undefined,
        context !== null,
        context.DependencyInjection instanceof DependencyInjection
    ]);

    validate = (context: AppContext): boolean => {
        return this.getValidations(context).every(x => x);
    }
}

enhanceClass(AppContextValidator, "AppContextValidator");