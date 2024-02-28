import React from "react";
import { IAppStore } from "../../interfaces";
import { AppContext } from "../../AppContext";
import { BasePage } from "../../base";
import { observer } from "mobx-react";

@observer
export class HomePage extends BasePage {
    private get appStore(): IAppStore {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IAppStore>("IAppStore");
    }

    async componentDidMount(): Promise<void> {
        await this.appStore.load();
    }

    async componentWillUnmount(): Promise<void> {
        await this.appStore.unload();
    }

    render(): React.ReactNode {
        return (
            <div className="app-page app-page-home">
                Home page
            </div>
        )
    }
}