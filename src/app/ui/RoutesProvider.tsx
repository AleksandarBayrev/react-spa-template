
import React from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { SomethingWentWrongPage, PageNotFound } from "@app-root/base/pages";
import { AboutPage, HomePage } from "@app-root/pages";

export const RoutesProvider = observer(() => {
    return (
        <Routes>
            <Route key={"home-page"} path="/" element={<HomePage />} errorElement={<SomethingWentWrongPage />} />
            <Route key={"home-page"} path="/home/:id" element={<HomePage />} errorElement={<SomethingWentWrongPage />} />
            <Route key={"about-page"} path="/about" element={<AboutPage />} errorElement={<SomethingWentWrongPage />} />
            <Route key={"not-found-page"} path="*" element={<PageNotFound />} errorElement={<SomethingWentWrongPage />} />
        </Routes>
    )
});