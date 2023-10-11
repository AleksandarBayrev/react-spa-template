import { IObservableValue } from "mobx";
import { IStore } from "./IStore";

export interface IAppStore extends IStore {
    currentPage: IObservableValue<string>;
    setCurrentPage(page: string): void;
}