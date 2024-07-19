import { IObservableValue, observable, runInAction } from "mobx";
import { IAppStore, IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";

export class AppStore implements IAppStore {
    private readonly browserHistoryManager: IBrowserHistoryManager;
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;

    @observable
    currentFullUrl: IObservableValue<string>;
    //#endregion

    constructor(browserHistoryManager: IBrowserHistoryManager) {
        this.browserHistoryManager = browserHistoryManager;
        const url = new URL(this.browserHistoryManager.currentUrl);
        this.currentPage = observable.box(this.browserHistoryManager.pathAndQuery);
        this.currentFullUrl = observable.box(url.toString());
    }

    //#region Base methods
    async load(): Promise<void> {
    }
    async unload(): Promise<void> {
    }
    //#endregion

    //#region Actions
    setCurrentPage = (page: string) => {
        runInAction(() => {
            this.currentPage.set(page);
        });
    }
    updateCurrentFullUrl = (): void => {
        runInAction(() => {
            const url = new URL(this.browserHistoryManager.currentUrl);
            this.currentFullUrl.set(url.toString());
        });
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");