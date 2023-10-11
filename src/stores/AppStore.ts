import { IObservableValue, action, observable } from "mobx";
import { IAppStore, IRouteManager } from "../interfaces";
import { enhanceClass } from "../base";

export class AppStore implements IAppStore {
    //#region Private properties
    private readonly routeManager: IRouteManager;
    //#endregion

    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;
    //#endregion

    constructor(routeManager: IRouteManager) {
        const url = new URL(window.location.href);
        this.routeManager = routeManager;
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
        this.routeManager.updateRoute(page);
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");