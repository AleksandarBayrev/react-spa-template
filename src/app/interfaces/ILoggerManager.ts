import { ILogger } from "./ILogger";

export interface ILoggerManager {
    addLogger(name: string): void;
    getLogger(name: string): ILogger;
    removeLogger(name: string): boolean;
}