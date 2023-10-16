import { IObservableValue, observable, runInAction } from "mobx";
import { IAppStore, IFormStore, IMessageBus, IUrlParser, RouteChangeMessage } from "../interfaces";
import { enhanceClass } from "../base";
import { MessageBusTopics, Routes } from "../constants";

export class FormStore implements IFormStore {
    //#region Private properties
    private readonly appStore: IAppStore;
    private readonly messageBus: IMessageBus;
    private readonly urlParser: IUrlParser;
    //#endregion
    //#region Public properties
    @observable
    name: IObservableValue<string>;
    //#endregion

    constructor(
        appStore: IAppStore,
        messageBus: IMessageBus,
        urlParser: IUrlParser) {
        this.appStore = appStore;
        this.messageBus = messageBus;
        this.urlParser = urlParser;
        this.name = observable.box("");
    }

    //#region Base methods
    async load(): Promise<void> {
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
            const url = new URL(`${window.location.origin}${this.appStore.currentPage.get()}`);
            this.name.set(name);
            if (name) {
                url.searchParams.set("name", name);
            } else {
                url.searchParams.delete("name");
            }
            this.messageBus.publishMessage<RouteChangeMessage>({
                topic: MessageBusTopics.PAGE_CHANGE,
                data: {
                    route: this.urlParser.parseUrl(url)
                }
            });
        });
    }
    //#endregion
}

enhanceClass(FormStore, "FormStore");