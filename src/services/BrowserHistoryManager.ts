import { createBrowserHistory, BrowserHistory, Listener } from "history";
import { IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";

export class BrowserHistoryManager implements IBrowserHistoryManager {
    private readonly history: BrowserHistory = createBrowserHistory();

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

    public listen = (listener: Listener) => {
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