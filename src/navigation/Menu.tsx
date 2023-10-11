import React from "react";
import { Link } from "./Link";
import { LinkConfiguration } from "../interfaces";

export class Menu extends React.Component {
    private readonly links: LinkConfiguration[] = [
        {
            text: "Home",
            location: "/"
        },
        {
            text: "About",
            location: "/about"
        },
        {
            text: "Form",
            location: "/form"
        }
    ];

    render() {
        return (
            <div className="app-menu-wrapper">
                {this.links.map((link, index) => <Link key={`${link.text}-${link.location}-${index}`} text={link.text} location={link.location} />)}
            </div>
        )
    }
}