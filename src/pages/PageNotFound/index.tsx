import React from "react";
import { IAppStore } from "../../interfaces";
import { observer } from "mobx-react";
import { BasePage, isValidContext } from "../../base";

@observer
export class PageNotFound extends BasePage {
    private get store(): IAppStore {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    async componentDidMount(): Promise<void> {
    }

    async componentWillUnmount(): Promise<void> {
    }

    render(): React.ReactNode {
        return (
            <div className="app-page app-page-not-found">
                Path {this.requestedPath} to page not found!
            </div>
        )
    }

    private get requestedPath() {
        const uri = new URL(this.store.currentFullUrl.get());
        return decodeURIComponent(uri.searchParams.get("requestedRoute") ?? "");
    }
}