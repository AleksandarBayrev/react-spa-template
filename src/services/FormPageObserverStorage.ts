import { enhanceClass } from "@app-base";
import { IFormPageObserverStorage } from "@app-interfaces";
import { ObserverStorage } from "./ObserverStorage";

export class FormPageObserverStorage extends ObserverStorage implements IFormPageObserverStorage {}

enhanceClass(FormPageObserverStorage, "FormPageObserverStorage");