import { DependencyInjection } from "@app-base";
import { MessageBusTopics } from "@app-constants";
import { IMessageBus } from "@app-interfaces";
import { PageLoadedMessage } from "@app-types";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    messageBus.subscribe<PageLoadedMessage>(MessageBusTopics.PAGE_LOADED, (message) => {
        console.log(`page loaded, route: ${message.data.route}`);
    });
}