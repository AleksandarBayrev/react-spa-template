import React from "react";
import { NavLink } from "react-router-dom";
import { MenuLinkProps } from "@app-root/types";
import { v4 } from "uuid";

const linksConfiguration: MenuLinkProps[] = [
    {
        to: "/",
        title: "Home"
    },
    {
        to: "/about",
        title: "About"
    },
    {
        to: "/missing-page",
        title: "Missing page"
    }
];

export const Menu = () => {
    return (
        <div className="app-menu">
            <ul>
                {linksConfiguration.map(({to, title}) => <li key={`${v4()}-${v4()}`}><NavLink to={to}>{title}</NavLink></li>)}
            </ul>
        </div>
    )

}