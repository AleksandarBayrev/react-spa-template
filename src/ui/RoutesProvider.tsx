
import React from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { SomethingWentWrongPage, PageNotFound } from "@app-root/base/pages";
import { AboutPage, HomePage } from "@app-root/pages";
import { AppContext } from "@app-root/AppContext";

@observer
export class RoutesProvider extends React.Component {
    render(): React.ReactNode {
        return (
            <Routes>
                <Route key={"home-page"} path="/" element={<HomePage />} errorElement={<SomethingWentWrongPage />} />
                <Route key={"about-page"} path="/about" element={<AboutPage />} errorElement={<SomethingWentWrongPage />} />
                <Route key={"not-found-page"} path="*" element={<PageNotFound />} errorElement={<SomethingWentWrongPage />} />
            </Routes>
        )
    }
}

RoutesProvider.contextType = AppContext;