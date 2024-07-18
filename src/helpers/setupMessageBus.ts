import { DependencyInjection } from "../base";
import { MessageBusTopics } from "../constants";
import { IMessageBus } from "../interfaces";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    messageBus.subscribe(MessageBusTopics.PAGE_LOADED, () => {
        console.log("page loaded");
    });
}