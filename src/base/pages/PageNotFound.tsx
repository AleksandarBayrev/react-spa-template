import React from "react";
import { BasePage } from "@app-root/base";

export class PageNotFound extends BasePage {
    render(): React.ReactNode {
        return (<div>Page {window.location.href} not found!</div>)
    }

}