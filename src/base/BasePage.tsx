import React from "react";

export abstract class BasePage extends React.Component {
    abstract render(): React.ReactNode;
}