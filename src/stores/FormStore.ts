import { IObservableValue, action, observable, runInAction } from "mobx";
import { IAppStore, IFormStore, IRouteManager } from "../interfaces";
import { enhanceClass } from "../base";

export class FormStore implements IFormStore {
    //#region Private properties
    private readonly routeManager: IRouteManager;
    private readonly appStore: IAppStore;
    //#endregion
    //#region Public properties
    @observable
    name: IObservableValue<string>;
    //#endregion

    constructor(
        appStore: IAppStore,
        routeManager: IRouteManager) {
            const url = new URL(window.location.href);
            this.appStore = appStore;
            this.routeManager = routeManager;
            this.name = observable.box(url.searchParams.get("name") || "");
    }

    //#region Base methods
    async load(): Promise<void> {
    }
    async unload(): Promise<void> {
        runInAction(() => {
            this.name.set("");
        });
    }
    //#endregion

    //#region Actions
    @action
    setName = (name: string): void => {
        const url = new URL(`${window.location.origin}${this.appStore.currentPage.get()}`);
        this.name.set(name);
        if (name) {
            url.searchParams.set("name", name);
        } else {
            url.searchParams.delete("name");
        }
        this.routeManager.updateRoute(url.toString());
    }
    //#endregion
}

enhanceClass(FormStore, "FormStore");