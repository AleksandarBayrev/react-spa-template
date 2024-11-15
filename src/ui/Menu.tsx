import React from "react";
import { NavLink } from "react-router-dom";
import { MenuLinkProps } from "@app-root/types";
import { v4 } from "uuid";

export class Menu extends React.Component {
    private readonly linksConfiguration: MenuLinkProps[] = [
        {
            to: "/",
            title: "Home"
        },
        {
            to: "/about",
            title: "About"
        }
    ];

    render(): React.ReactNode {
        return (
            <div className="app-menu">
                <ul>
                    {this.linksConfiguration.map(({to, title}) => <li key={`${v4()}-${v4()}`}><NavLink to={to}>{title}</NavLink></li>)}
                </ul>
            </div>
        )
    }
}