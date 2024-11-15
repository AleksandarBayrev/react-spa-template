import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { AppContext } from "@app-root/AppContext";
import { Menu } from "@app-root/ui";
import AppLogo from "@app-root/resources/spa-logo.png";
import { AboutPage, HomePage } from "@app-root/pages";
import { PageNotFound, SomethingWentWrongPage } from "@app-root/base/pages";
import { IAppStore } from "@app-root/interfaces";
import { AppContextProvider } from "@app-root/base";

@observer
export class App extends React.Component {

    context: AppContext | undefined;

    private get appStore(): IAppStore {
        return AppContextProvider.getContext(this.context).DependencyInjection.getService("IAppStore");
    }

    async componentDidMount(): Promise<void> {
        await this.appStore.load();
    }

    render(): React.ReactNode {
        return (
            <div className="app-wrapper">
                {this.appStore.appLoaded ?
                    <BrowserRouter>
                        <div className="app-logo">
                            <img src={AppLogo} />
                        </div>
                        <div className="app-name">
                            {this.appStore.appName}
                        </div>
                        <div className="menu-wrapper">
                            <Menu />
                        </div>
                        <div className="page-wrapper">
                            <Routes>
                                <Route key={"home-page"} path="/" element={<HomePage />} errorElement={<SomethingWentWrongPage />} />
                                <Route key={"about-page"} path="/" element={<AboutPage />} errorElement={<SomethingWentWrongPage />} />
                                <Route key={"not-found-page"} path="*" element={<PageNotFound />} errorElement={<SomethingWentWrongPage />} />
                            </Routes>
                        </div>
                    </BrowserRouter>
                    :
                    <div>Loading app...</div>}
            </div>
        )
    }
}

App.contextType = AppContext;