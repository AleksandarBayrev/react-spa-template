import { Listener, Location } from "history";

export interface IBrowserHistoryManager {
    push(path: string): void;
    replace(path: string): void;
    back(): void;
    forward(): void;
    listen(listenerName: string, listener: Listener): void;
    get location(): Location;
    get origin(): string;
}