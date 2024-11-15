import { enhanceClass } from "@app-root/base";
import { IConfigurationFetcher } from "@app-root/interfaces";
import { AppConfiguration } from "@app-root/types";

export class ConfigurationFetcher implements IConfigurationFetcher {
    private count: number = 0;
    getConfiguration(): Promise<AppConfiguration> {
        if (this.count === 100) {
            this.count = 0;
        }
        return Promise.resolve({
            appName: this.count++ % 2 === 0 ? "React SPA Template" : "Asd"
        });
    }
}

enhanceClass(ConfigurationFetcher, "ConfigurationFetcher");