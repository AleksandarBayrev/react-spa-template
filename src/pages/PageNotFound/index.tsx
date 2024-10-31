import React from "react";
import { IAppStore, IUrlParser } from "@app-interfaces";
import { observer } from "mobx-react";
import { BasePage, getContext } from "@app-base";
import { AppContext } from "@app-context";

@observer
export class PageNotFound extends BasePage {
    private get appContext(): AppContext {
        return getContext(this.context);
    }

    private get store(): IAppStore {
        return this.appContext.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get urlParser(): IUrlParser {
        return this.appContext.dependencyInjection.getService<IUrlParser>("IUrlParser");
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
        const currentFullUrl = new URL(this.store.currentFullUrl.get());
        const requestedRoute = this.urlParser.getUrlParameter(currentFullUrl, "requestedRoute");
        return decodeURIComponent(requestedRoute ? requestedRoute : this.urlParser.parseUrl(currentFullUrl));
    }
}