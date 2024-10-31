import React from "react";
import spaLogo from "@app-resources/spa-logo.png";

export class AppLogo extends React.Component {
    render() {
        return (
            <div className="app-logo-wrapper">
                <img src={spaLogo} className="app-logo"/>
            </div>
        )
    }
}