import { AppContext } from "@app-root/AppContext";
import { AppContextProvider } from "@app-root/base";
import { IAppStore } from "@app-root/interfaces";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

export const AboutPage = observer(() => {
    const context = AppContextProvider.getContext(AppContext);
    const appStore = context.DependencyInjection.getService<IAppStore>("IAppStore");
    useEffect(() => {
        console.log(appStore.appName);
    }, []);
    return (
        <div>About page</div>
    )
});