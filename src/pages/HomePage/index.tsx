import React from "react";
import { IAppStore } from "@app-interfaces";
import { BasePage, getContext } from "@app-base";
import { observer } from "mobx-react";
import { AppContext } from "@app-context";

@observer
export class HomePage extends BasePage {
    private get appContext(): AppContext {
        return getContext(this.context);
    }

    private get appStore(): IAppStore {
        return this.appContext.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    async componentDidMount(): Promise<void> {
    }

    async componentWillUnmount(): Promise<void> {
    }

    render(): React.ReactNode {
        return (
            <div className="app-page app-page-home">
                Home page
            </div>
        )
    }
}