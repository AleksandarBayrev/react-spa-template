import React from "react";
import { IAppStore, IBrowserHistoryManager, IFormStore, IUrlParser } from "../../interfaces";
import { observer } from "mobx-react";
import { BasePage, isValidContext } from "../../base";
import { AppContext } from "../../AppContext";

@observer
export class FormPage extends BasePage {
    private get appContext(): AppContext {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context;
    }

    private get appStore(): IAppStore {
        return this.appContext.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get formStore(): IFormStore {
        return this.appContext.dependencyInjection.getService<IFormStore>("IFormStore");
    }

    private get browserHistoryManager(): IBrowserHistoryManager {
        return this.appContext.dependencyInjection.getService<IBrowserHistoryManager>("IBrowserHistoryManager");
    }

    async componentDidMount(): Promise<void> {
        await this.formStore.load();
        this.browserHistoryManager.listen("onNameChange", (update) => {
            console.log(update);
        });
    }

    async componentWillUnmount(): Promise<void> {
        await this.formStore.unload();
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