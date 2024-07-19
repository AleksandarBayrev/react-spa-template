import { IObservableValue, Lambda } from "mobx";
import { IStore } from "./IStore";

export interface IAppStore extends IStore {
    currentPage: IObservableValue<string>;
    currentFullUrl: IObservableValue<string>;
    setCurrentPage(page: string): void;
    updateCurrentFullUrl(): void;
}