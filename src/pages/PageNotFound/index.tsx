import React from "react";
import { IAppStore } from "../../interfaces";
import { observer } from "mobx-react";
import { DependencyInjection } from "../../base";

type PageNotFoundProps = {
    dependencyInjection: DependencyInjection;
}

@observer
export class PageNotFound extends React.Component<PageNotFoundProps> {
    private readonly store: IAppStore;

    constructor(props: PageNotFoundProps) {
        super(props);
        this.store = props.dependencyInjection.getService<IAppStore>("IAppStore");
    }
    render(): React.ReactNode {
        return (
            <div className="app-page-home">
                Path {this.store.currentPage.get()} to page not found!
            </div>
        )
    }
}