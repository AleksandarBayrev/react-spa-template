import { IObservableValue, action, observable } from "mobx";
import { IAppStore } from "../interfaces";
import { enhanceClass } from "../base";

export class AppStore implements IAppStore {
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;
    //#endregion

    constructor() {
        const url = new URL(window.location.href);
        this.currentPage = observable.box(url.pathname);
    }

    //#region Base methods
    async load(): Promise<void> {
    }
    async unload(): Promise<void> {
    }
    //#endregion

    //#region Actions
    @action
    setCurrentPage = (page: string) => {
        this.currentPage.set(page);
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");