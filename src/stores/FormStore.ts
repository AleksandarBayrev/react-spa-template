import { IObservableValue, observable, runInAction } from "mobx";
import { IAppStore, IBrowserHistoryManager, IFormStore, IMessageBus, IUrlParser } from "@app-interfaces";
import { enhanceClass } from "../base";
import { MessageBusTopics, Routes } from "../constants";
import { PageLoadedMessage } from "../types";

export class FormStore implements IFormStore {
    //#region Private properties
    private readonly appStore: IAppStore;
    private readonly messageBus: IMessageBus;
    private readonly urlParser: IUrlParser;
    private readonly browserHistoryManager: IBrowserHistoryManager;
    //#endregion
    //#region Public properties
    @observable
    name: IObservableValue<string>;
    //#endregion

    constructor(
        appStore: IAppStore,
        messageBus: IMessageBus,
        urlParser: IUrlParser,
        browserHistoryManager: IBrowserHistoryManager) {
        this.appStore = appStore;
        this.messageBus = messageBus;
        this.urlParser = urlParser;
        this.browserHistoryManager = browserHistoryManager;
        this.name = observable.box("");
    }

    //#region Base methods
    async load(): Promise<void> {
        const url = new URL(this.browserHistoryManager.currentUrl);
        this.setName(this.urlParser.getUrlParameter(url, "name"));
    }
    async unload(): Promise<void> {
        const url = new URL(this.browserHistoryManager.currentUrl);
        if (url.pathname.includes(Routes["/form"])) {
            this.setName(this.urlParser.getUrlParameter(url, "name"));
        } else {
            this.setName("");
        }
    }
    //#endregion

    //#region Actions
    setName = (name: string): void => {
        runInAction(() => {
            this.name.set(name);
        });
    }

    updateUrl = () => {
        console.log("updating");
        const url = new URL(this.browserHistoryManager.currentUrl);
        if (this.name.get()) {
            url.searchParams.set("name", this.name.get());
        } else {
            url.searchParams.delete("name");
        }
        this.browserHistoryManager.push(url.toString());
        this.messageBus.publishMessage<PageLoadedMessage>({
            topic: MessageBusTopics.PAGE_LOADED,
            data: {
                route: this.browserHistoryManager.pathAndQuery
            }
        });
    }
    //#endregion
}

enhanceClass(FormStore, "FormStore");