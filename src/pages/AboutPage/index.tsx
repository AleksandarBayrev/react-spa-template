import React from "react";
import { DependencyInjection } from "../../base";
import { IAppStore } from "../../interfaces";

type AboutPageProps = {
    dependencyInjection: DependencyInjection;
}

export class AboutPage extends React.Component<AboutPageProps> {
    private readonly appStore: IAppStore = this.props.dependencyInjection.getService<IAppStore>("IAppStore");

    async componentDidMount(): Promise<void> {
        await this.appStore.load();
    }

    async componentWillUnmount(): Promise<void> {
        await this.appStore.unload();
    }

    render(): React.ReactNode {
        return (
            <div className="app-page-about">
                About me - React Single Page Application template with routing
            </div>
        )
    }
}