import { IObservableValue, Lambda } from "mobx";
import { IStore } from "./IStore";

export interface IAppStore extends IStore {
    addObserver: (name: string, observer: Lambda) => void;
    clearObservers: () => void;
    getObserverNames: () => string[];
    currentPage: IObservableValue<string>;
    currentFullUrl: IObservableValue<string>;
    setCurrentPage(page: string): void;
    updateCurrentFullUrl(): void;
}