import React from "react";
import { observer } from "mobx-react";
import { DependencyInjection } from "./base";
import { IAppStore, IMessageBus, RouteChangeMessage, IPageRenderer, IRouteManager } from "./interfaces";
import { Link } from "./navigation";
import "./App.css";
import spaLogo from "./resources/spa-logo.png";
import { MessageBusTopics } from "./constants";
import { observe } from "mobx";

type AppProps = {
    dependencyInjection: DependencyInjection;
}

@observer
export class App extends React.Component<AppProps> {
    private readonly store: IAppStore;
    private readonly pageRenderer: IPageRenderer;
    private readonly messageBus: IMessageBus;
    private readonly routeManager: IRouteManager;

    constructor(props: AppProps) {
        super(props);
        this.routeManager = props.dependencyInjection.getService<IRouteManager>("IRouteManager");
        this.store = props.dependencyInjection.getService<IAppStore>("IAppStore");
        this.pageRenderer = props.dependencyInjection.getService<IPageRenderer>("IPageRenderer");
        this.messageBus = props.dependencyInjection.getService<IMessageBus>("IMessageBus");
        this.messageBus.subscribe<RouteChangeMessage>(MessageBusTopics.PAGE_CHANGE, (message) => {
            this.routeManager.updateRoute(message.data.route);
        });
    }

    async componentDidMount() {
        observe(this.store.currentPage, async (change) => {
            await this.messageBus.publishMessage<RouteChangeMessage>({
                topic: MessageBusTopics.PAGE_CHANGE,
                data: {
                    route: change.newValue
                }
            });
        });
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-logo-container">
                    <img src={spaLogo} />
                </div>
                <div className="app-menu-container">
                    <Link text="Home" location="/" />
                    <Link text="About" location="/about" />
                    <Link text="Form" location="/form" />
                </div>
                <div className="app-page-wrapper">
                    {this.pageRenderer.renderPage(this.store.currentPage.get())}
                </div>
            </div>
        );
    }
}