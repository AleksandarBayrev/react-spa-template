import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { IAppStore, IMessageBus, IPageRenderer } from "./interfaces";
import { Routes as RoutesConstants } from "./constants";
import { Menu } from "./navigation";
import { AppLogo } from "./ui";
import { AppContext } from "./AppContext";
import { isValidContext } from "./base";
import { Routes, Route, BrowserRouter } from "react-router-dom";

@observer
export class App extends React.Component {
    private readonly routes = [
        {
            path: RoutesConstants["/"],
            element: this.pageRenderer.renderPage(RoutesConstants["/"])
        },
        {
            path: RoutesConstants["/about"],
            element: this.pageRenderer.renderPage(RoutesConstants["/about"])
        },
        {
            path: RoutesConstants["/form"],
            element: this.pageRenderer.renderPage(RoutesConstants["/form"])
        },
        {
            path: RoutesConstants["/404"],
            element: this.pageRenderer.renderPage(RoutesConstants["/404"])
        },
    ];

    private get store(): IAppStore {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get pageRenderer(): IPageRenderer {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context.dependencyInjection.getService<IPageRenderer>("IPageRenderer");
    }

    private get messageBus(): IMessageBus {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context.dependencyInjection.getService<IMessageBus>("IMessageBus");
    };

    async componentDidMount() {
        await this.store.load();
    }

    async componentWillUnmount() {
        await this.store.unload();
    }

    private renderRoutes = () => {
        return <Routes>
            {this.routes.map(x => <Route key={x.path} path={x.path} element={x.element} />)}
            <Route key="404-page" path="*" element={this.pageRenderer.renderPage(RoutesConstants["/404"])} />
        </Routes>
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <div className="app-logo-container">
                        <AppLogo />
                    </div>
                    <div className="app-menu-container">
                        <Menu />
                    </div>
                    <div className="app-page-wrapper">
                        {this.renderRoutes()}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

App.contextType = AppContext;