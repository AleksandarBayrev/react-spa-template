import { IObservableValue, action, observable, runInAction } from "mobx";
import { IAppStore, IFormStore, IMessageBus, IUrlParser, RouteChangeMessage } from "../interfaces";
import { enhanceClass } from "../base";
import { MessageBusTopics } from "../constants";

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
        const url = new URL(window.location.href);
        this.appStore = appStore;
        this.messageBus = messageBus;
        this.urlParser = urlParser;
        this.name = observable.box(this.urlParser.getUrlParameter(url, "name"));
    }

    //#region Base methods
    async load(): Promise<void> {
    }
    async unload(): Promise<void> {
        runInAction(() => {
            this.name.set("");
        });
    }
    //#endregion

    //#region Actions
    @action
    setName = (name: string): void => {
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
    }
    //#endregion
}

enhanceClass(FormStore, "FormStore");