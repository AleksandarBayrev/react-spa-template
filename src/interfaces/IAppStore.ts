import { IObservableValue } from "mobx";

export interface IAppStore {
    currentPage: IObservableValue<string>;
    setCurrentPage(page: string): void;
}