import { IObservableValue, Lambda, observable, runInAction } from "mobx";
import { IAppStore } from "../interfaces";
import { enhanceClass } from "../base";

export class AppStore implements IAppStore {
    private readonly lambdaObservers: Map<string, Lambda>;
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;

    @observable
    currentFullUrl: IObservableValue<string>;
    //#endregion

    constructor() {
        this.lambdaObservers = new Map<string, Lambda>();
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

    //#region Observer operations
    addObserver = (name: string, observer: Lambda) => {
        if (this.lambdaObservers.has(name)) return;
        this.lambdaObservers.set(name, observer);
    }
    clearObservers = () => {
        this.lambdaObservers.forEach((observer) => observer());
        this.lambdaObservers.clear();
    }
    getObserverNames = () => {
        return [...this.lambdaObservers.keys()];
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");