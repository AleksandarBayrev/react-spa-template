import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Lambda, observe } from "mobx";
import { DependencyInjection } from "./base";
import { IAppStore, IMessageBus, RouteChangeMessage, IPageRenderer } from "./interfaces";
import { MessageBusTopics } from "./constants";
import { Menu } from "./navigation";
import { AppLogo } from "./ui";

type AppProps = {
    dependencyInjection: DependencyInjection;
}

@observer
export class App extends React.Component<AppProps> {
    private readonly store: IAppStore;
    private readonly pageRenderer: IPageRenderer;
    private readonly messageBus: IMessageBus;
    private currentPageObserver!: Lambda | undefined;
    private currentFullUrlObserver!: Lambda | undefined;

    constructor(props: AppProps) {
        super(props);
        this.store = props.dependencyInjection.getService<IAppStore>("IAppStore");
        this.pageRenderer = props.dependencyInjection.getService<IPageRenderer>("IPageRenderer");
        this.messageBus = props.dependencyInjection.getService<IMessageBus>("IMessageBus");
    }

    async componentDidMount() {
        this.currentPageObserver = observe(this.store.currentPage, async (change) => {
            await this.messageBus.publishMessage<RouteChangeMessage>({
                topic: MessageBusTopics.PAGE_CHANGE,
                data: {
                    route: change.newValue
                }
            });
        });
    }

    async componentWillUnmount() {
        if (this.currentPageObserver) {
            this.currentPageObserver();
        }
        if (this.currentFullUrlObserver) {
            this.currentFullUrlObserver();
        }
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