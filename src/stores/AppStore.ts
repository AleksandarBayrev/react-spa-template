import { enhanceClass } from "@app-root/base";
import { IAppStore, IConfigurationFetcher } from "@app-root/interfaces";
import { AppConfiguration } from "@app-root/types";
import { computed, observable, runInAction } from "mobx";

export class AppStore implements IAppStore {
    @observable
    private appConfig: AppConfiguration = observable<AppConfiguration>({
        appName: ""
    });

    private reloadInterval: NodeJS.Timeout | null = null;

    constructor(private readonly configurationFetcher: IConfigurationFetcher) {}

    load(): Promise<void> {
        return new Promise((res, rej) => {
            this.reloadInterval = setInterval(() => {
                runInAction(async () => {
                    try {
                        const { appName } = await this.configurationFetcher.getConfiguration();
                        this.appConfig.appName = appName;
                        res();
                    } catch (err) {
                        rej(err);
                    }
                });
            }, 500);
        });
    }

    unload(): Promise<void> {
        return new Promise((res, rej) => {
            if (this.reloadInterval) {
                clearInterval(this.reloadInterval);
            }
            res();
        });
    }

    @computed
    get appName(): string {
        return this.appConfig.appName;
    }
}

enhanceClass(AppStore, "AppStore");