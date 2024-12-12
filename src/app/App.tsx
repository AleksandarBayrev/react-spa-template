import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { AppContext } from "@app-root/AppContext";
import { Menu, RoutesProvider } from "@app-root/ui";
import AppLogo from "@app-root/resources/spa-logo.png";
import { IAppStore } from "@app-root/interfaces";
import { AppContextProvider } from "@app-root/base";

import "@app-styles/App.css";

const loadStore = async (appStore: IAppStore) => {
    await appStore.load();
}

export const App = observer(() => {
    const context = AppContextProvider.getContext(AppContext);
    const appStore = context.DependencyInjection.getService<IAppStore>("IAppStore");
    loadStore(appStore);
    return (
        <div className="app-wrapper">
            {appStore.appLoaded ?
                <BrowserRouter>
                    <div className="app-logo">
                        <img src={AppLogo} />
                    </div>
                    <div className="app-name">
                        {appStore.appName}
                    </div>
                    <div className="menu-wrapper">
                        <Menu />
                    </div>
                    <div className="page-wrapper">
                        <RoutesProvider />
                    </div>
                </BrowserRouter>
                :
                <div>Loading app...</div>}
        </div>
    )
});
