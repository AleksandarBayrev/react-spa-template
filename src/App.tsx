import React from "react";
import { observer } from "mobx-react";
import { DependencyInjection } from "./base";
import { IAppStore } from "./interfaces";
import { IPageRenderer } from "./interfaces/IPageRenderer";
import { Link } from "./navigation";
import "./App.css";
import spaLogo from "./resources/spa-logo.png";

type AppProps = {
    dependencyInjection: DependencyInjection;
}

@observer
export class App extends React.Component<AppProps> {
    private readonly store: IAppStore;
    private readonly pageRenderer: IPageRenderer;

    constructor(props: AppProps) {
        super(props);
        this.store = props.dependencyInjection.getService<IAppStore>("IAppStore");
        this.pageRenderer = props.dependencyInjection.getService<IPageRenderer>("IPageRenderer");
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