import { enhanceClass } from "@app-root/base";
import { IAppStore, IConfigurationFetcher } from "@app-root/interfaces";
import { AppConfiguration } from "@app-root/types";
import { computed, IObservableValue, observable, runInAction } from "mobx";

export class AppStore implements IAppStore {

    @observable
    private _appLoaded: IObservableValue<boolean> = observable.box(false);

    @observable
    private _appConfig: AppConfiguration = observable<AppConfiguration>({
        appName: ""
    });

    private reloadInterval: NodeJS.Timeout | null = null;

    constructor(private readonly configurationFetcher: IConfigurationFetcher) {}

    load(): Promise<void> {
        if (this.reloadInterval) {
            return Promise.resolve();
        }
        return new Promise((res, rej) => {
            this.reloadInterval = setInterval(async () => {
                try {
                    const { appName } = await this.configurationFetcher.getConfiguration();
                    runInAction(() => {
                        this._appConfig.appName = appName;
                        this._appLoaded.set(true);
                    });
                    res();
                } catch (err) {
                    rej(err);
                }
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
        return this._appConfig.appName;
    }

    @computed
    get appLoaded(): boolean {
        return this._appLoaded.get();
    }
}

enhanceClass(AppStore, "AppStore");