import React from "react";
import spaLogo from "../resources/spa-logo.png";

export class AppLogo extends React.Component {
    render() {
        return (
            <div>
                <img src={spaLogo} />
            </div>
        )
    }
}