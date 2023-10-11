import React from "react";
import { DependencyInjection } from "../../base";
import { IAppStore } from "../../interfaces";

type HomeProps = {
    dependencyInjection: DependencyInjection;
}

export class HomePage extends React.Component<HomeProps> {
    private readonly appStore: IAppStore = this.props.dependencyInjection.getService<IAppStore>("IAppStore");
    async componentDidMount(): Promise<void> {
        await this.appStore.load();
    }
    async componentWillUnmount(): Promise<void> {
        await this.appStore.unload();
    }
    render(): React.ReactNode {
        return (
            <div className="app-page-home">
                Home page
            </div>
        )
    }
}