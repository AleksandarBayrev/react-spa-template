import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Lambda, observe } from "mobx";
import { IAppStore, IMessageBus, RouteChangeMessage, IPageRenderer } from "./interfaces";
import { MessageBusTopics } from "./constants";
import { Menu } from "./navigation";
import { AppLogo } from "./ui";
import { AppContext } from "./AppContext";

@observer
export class App extends React.Component {
    private get store(): IAppStore {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get pageRenderer(): IPageRenderer {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IPageRenderer>("IPageRenderer");
    }

    private get messageBus(): IMessageBus {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IMessageBus>("IMessageBus");
    };

    async componentDidMount() {
        setInterval(() => {
            console.log(this.messageBus.numberOfSubscribers());
        }, 100);
        console.log(new Date(), 'mounting')
        await this.store.load();
        this.store.addObserver("routeChangeObserver", observe(this.store.currentPage, (change) => {
            console.log(change);
            console.log(this.store.getObserverNames());
            if (change.oldValue === change.newValue) return;
            return this.messageBus.publishMessage<RouteChangeMessage>({
                topic: MessageBusTopics.PAGE_CHANGE,
                data: {
                    route: change.newValue
                }
            });
        }));
    }

    async componentWillUnmount() {
        console.log(new Date(), 'unmounting')
        await this.store.unload();
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-logo-container">
                    <AppLogo />
                </div>
                <div className="app-menu-container">
                    <Menu />
                </div>
                <div className="app-page-wrapper">
                    {this.pageRenderer.renderPage(this.store.currentPage.get())}
                </div>
            </div>
        );
    }
}

App.contextType = AppContext;