import React from "react";
import { IAppStore, IFormStore } from "../../interfaces";
import { observer } from "mobx-react";
import { AppContext } from "../../AppContext";

@observer
export class FormPage extends React.Component {
    private get appStore(): IAppStore {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get formStore(): IFormStore {
        if (!this.context) {
            throw new Error("AppContext not provided!");
        }
        return (this.context as AppContext).dependencyInjection.getService<IFormStore>("IFormStore");
    }

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
            <div className="app-page app-page-form">
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

FormPage.contextType = AppContext;