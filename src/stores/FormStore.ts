import { IObservableValue, observable, runInAction, observe } from "mobx";
import { IAppStore, IBrowserHistoryManager, IFormStore, IMessageBus, IUrlParser, RouteChangeMessage } from "../interfaces";
import { enhanceClass } from "../base";
import { MessageBusTopics, Routes } from "../constants";

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
        observe(this.name, (change) => {

        });
        const url = new URL(window.location.href);
        this.setName(this.urlParser.getUrlParameter(url, "name"));
    }
    async unload(): Promise<void> {
        const url = new URL(window.location.href);
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
            this.updateUrl();
            this.messageBus.publishMessage({
                topic: MessageBusTopics.PAGE_LOADED,
                data: {
                    name
                }
            });
        });
    }
    //#endregion

    //#region Private methods
    private updateUrl = () => {
        const url = new URL(`${this.browserHistoryManager.origin}${this.appStore.currentPage.get()}`);
        if (this.name.get()) {
            url.searchParams.set("name", this.name.get());
        } else {
            url.searchParams.delete("name");
        }
        this.browserHistoryManager.replace(url.toString());
    }
    //#endregion
}

enhanceClass(FormStore, "FormStore");