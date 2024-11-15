import { enhanceClass } from "@app-root/base";
import { IConfigurationFetcher } from "@app-root/interfaces";
import { AppConfiguration } from "@app-root/types";

export class ConfigurationFetcher implements IConfigurationFetcher {
    getConfiguration(): Promise<AppConfiguration> {
        return Promise.resolve({
            appName: new Date().getTime() % 2 === 0 ? "React SPA Template" : "Asd"
        });
    }
}

enhanceClass(ConfigurationFetcher, "ConfigurationFetcher");