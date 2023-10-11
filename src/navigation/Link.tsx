import React from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { DependencyInjection } from "../base";
import { IAppStore } from "../interfaces";
import "./Link.css";

type LinkProps = {
    location: string;
    text: string;
}

@observer
export class Link extends React.Component<LinkProps> {
    private readonly dependencyInjection: DependencyInjection;

    constructor(props: LinkProps) {
        super(props);
        this.dependencyInjection = DependencyInjection.getInstance();
    }

    render(): React.ReactNode {
        return (
            <div className="app-link-wrapper">
                <a className={this.getStyles()} onClick={this.goToLocation}>{this.props.text}</a>
            </div>
        )
    }

    private goToLocation = () => {
        const appStore = this.dependencyInjection.getService<IAppStore>("IAppStore");
        runInAction(() => {
            appStore.setCurrentPage(this.props.location);
        });
    }

    private getStyles = () => {
        const store = this.dependencyInjection.getService<IAppStore>("IAppStore");
        return store.currentPage.get() === this.props.location ? `app-link-anchor app-link-anchor-selected` : `app-link-anchor`;
    }
}