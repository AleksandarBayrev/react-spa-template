import { DependencyInjection } from "../base";
import { MessageBusTopics } from "../constants";
import { IMessageBus } from "../interfaces";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    messageBus.subscribe<{name: string}>(MessageBusTopics.PAGE_LOADED, (message) => {
        console.log(`page loaded${message.data?.name ? ", name: " + message.data.name : ""}`);
    });
}