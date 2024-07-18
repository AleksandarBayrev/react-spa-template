import { IObservableValue } from "mobx";
import { IStore } from "./IStore";

export interface IFormStore extends IStore {
    name: IObservableValue<string>;
    setName(name: string): void;
    updateUrl(): void;
}