import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { AppContext } from "@app-root/AppContext";
import { Menu } from "@app-root/ui";
import AppLogo from "@app-root/resources/spa-logo.png";
import { AboutPage, HomePage } from "@app-root/pages";
import { PageNotFound, SomethingWentWrongPage } from "@app-root/base/pages";
import { IAppStore } from "@app-root/interfaces";

@observer
export class App extends React.Component {

    context!: AppContext;

    private get appStore(): IAppStore {
        return this.context.DependencyInjection.getService("IAppStore");
    }

    async componentDidMount(): Promise<void> {
        await this.appStore.load();
    }

    render(): React.ReactNode {
        return (
            <div className="app-wrapper">
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
            </div>
        )
    }
}

App.contextType = AppContext;