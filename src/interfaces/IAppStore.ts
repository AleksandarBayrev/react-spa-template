import { IStore } from "./IStore";

export interface IAppStore extends IStore {
    get appName(): string;
}