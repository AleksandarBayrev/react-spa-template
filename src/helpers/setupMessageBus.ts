import { DependencyInjection } from "../base";
import { MessageBusTopics } from "../constants";
import { IAppStore, IMessageBus, IRouteManager, RouteChangeMessage } from "../interfaces";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    const routeManager = DependencyInjection.getInstance().getService<IRouteManager>("IRouteManager");
    const appStore = DependencyInjection.getInstance().getService<IAppStore>("IAppStore");
    await messageBus.subscribe<RouteChangeMessage>(MessageBusTopics.PAGE_CHANGE, (message) => {
        routeManager.updateRoute(message.data.route);
    });
    await messageBus.subscribe<RouteChangeMessage>(MessageBusTopics.PAGE_CHANGE, (message) => {
        appStore.updateCurrentFullUrl();
        console.log(`You are here: ${appStore.currentFullUrl.get()}`);
    });
}