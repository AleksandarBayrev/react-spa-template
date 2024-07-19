import { createBrowserHistory, BrowserHistory, Listener } from "history";
import { IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";

export class BrowserHistoryManager implements IBrowserHistoryManager {
    private readonly listeners: Map<string, Listener>;
    private readonly history: BrowserHistory;

    constructor() {
        this.listeners = new Map();
        this.history = createBrowserHistory();
    }

    public push = (path: string) => {
        this.history.push(path);
    }

    public replace = (path: string) => {
        this.history.replace(path);
    }

    public back = () => {
        this.history.back();
    }

    public forward = () => {
        this.history.forward();
    }

    public listen = (listenerName: string, listener: Listener) => {
        if (this.listeners.has(listenerName)) {
            return;
        }
        this.listeners.set(listenerName, listener);
        this.history.listen(listener);
    }

    public get location() {
        return {...this.history.location};
    }
    
    public get origin() {
        return window.location.origin;
    }
}

enhanceClass(BrowserHistoryManager, "BrowserHistoryManager");