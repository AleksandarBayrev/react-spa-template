import React from "react";
import { DependencyInjection } from "../../base";
import { IAppStore, IFormStore } from "../../interfaces";
import { observer } from "mobx-react";

type FormPageProps = {
    dependencyInjection: DependencyInjection;
}

@observer
export class FormPage extends React.Component<FormPageProps> {
    private readonly formStore: IFormStore = this.props.dependencyInjection.getService<IFormStore>("IFormStore");
    private readonly appStore: IAppStore = this.props.dependencyInjection.getService<IAppStore>("IAppStore");
    async componentDidMount(): Promise<void> {
        await this.appStore.load();
        await this.formStore.load();
    }
    async componentWillUnmount(): Promise<void> {
        await this.formStore.unload();
        await this.appStore.unload();
    }
    render(): React.ReactNode {
        return (
            <div className="app-page-form">
                <form>
                    <div className="form-element-wrapper">
                        <div className="form-label">Name: </div>
                        <div className="form-element"><input type="text" value={this.formStore.name.get()} onChange={this.onChangeHandler} /></div>
                    </div>
                </form>
            </div>
        )
    }

    private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => this.formStore.setName(e.target.value);
}