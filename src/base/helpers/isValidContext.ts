import { AppContext } from "../../AppContext";
import { DependencyInjection } from "../DependencyInjection";

export const isValidContext = (context: any): context is AppContext => context && context.dependencyInjection instanceof DependencyInjection;