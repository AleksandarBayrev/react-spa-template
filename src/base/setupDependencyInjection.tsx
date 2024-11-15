import {  IAppStore, IConfigurationFetcher, ILoggerManager } from "@app-root/interfaces";
import { DependencyInjection } from "@app-root/base/DependencyInjection";
import { LoggerManager, ConfigurationFetcher } from "@app-root/services";
import { AppStore } from "@app-root/stores";

export const setupDependencyInjection = async (DI: DependencyInjection) => {
    DI.registerService<ILoggerManager>("ILoggerManager", "singleton", LoggerManager, []);
    DI.registerService<IConfigurationFetcher>("IConfigurationFetcher", "singleton", ConfigurationFetcher, []);
    const configurationFetcher = DI.getService<IConfigurationFetcher>("IConfigurationFetcher");
    DI.registerService<IAppStore>("IAppStore", "singleton", AppStore, [configurationFetcher]);
}