import { AppConfiguration } from "@app-root/types";

export interface IConfigurationFetcher {
    getConfiguration(): Promise<AppConfiguration>;
}