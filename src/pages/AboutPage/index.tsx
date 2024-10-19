import React from "react";
import { IAppStore } from "../../interfaces";
import { BasePage, getContext } from "../../base";
import { observer } from "mobx-react";
import { AppContext } from "../../AppContext";

@observer
export class AboutPage extends BasePage {
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
            <div className="app-page app-page-about">
                About me - React Single Page Application template with routing
            </div>
        )
    }
}