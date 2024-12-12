import { AppContext } from "@app-root/AppContext";
import { AppContextProvider } from "@app-root/base";
import { IAppStore } from "@app-root/interfaces";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


export const HomePage = observer(() => {
    const context = AppContextProvider.getContext(AppContext);
    const appStore = context.DependencyInjection.getService<IAppStore>("IAppStore");
    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchParamsArray = [...searchParams.entries()];
    useEffect(() => {
        console.log(appStore.appName);
    }, []);
    return (
        <div>Home Page
            {searchParamsArray.length ? <div>, search params: {JSON.stringify(searchParamsArray)}</div> : ""}
            {Object.keys(params).length ? <div>, path params: {JSON.stringify(params)}</div> : ""}
        </div>
    );
});