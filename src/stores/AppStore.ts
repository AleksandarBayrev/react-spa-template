import { IObservableValue, observable, runInAction } from "mobx";
import { IAppStore } from "../interfaces";
import { enhanceClass } from "../base";

export class AppStore implements IAppStore {
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;

    @observable
    currentFullUrl: IObservableValue<string>;
    //#endregion

    constructor() {
        const url = new URL(window.location.href);
        this.currentPage = observable.box(url.pathname);
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
            const url = new URL(window.location.href);
            this.currentFullUrl.set(url.toString());
        });
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");