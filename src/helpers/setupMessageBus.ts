import { DependencyInjection } from "../base";
import { MessageBusTopics } from "../constants";
import { IMessageBus, IRouteManager, RouteChangeMessage } from "../interfaces";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    const routeManager = DependencyInjection.getInstance().getService<IRouteManager>("IRouteManager");
    await messageBus.subscribe<RouteChangeMessage>(MessageBusTopics.PAGE_CHANGE, (message) => {
        routeManager.updateRoute(message.data.route);
    });
}