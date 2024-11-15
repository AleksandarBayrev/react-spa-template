import { ILogger, ILoggerManager } from "@app-root/interfaces";
import { Logger } from "./Logger";
import { enhanceClass } from "@app-root/base";

export class LoggerManager implements ILoggerManager {
    private readonly loggers: Map<string, ILogger>;

    constructor() {
        this.loggers = new Map();
    }

    addLogger(name: string): void {
        this.loggers.set(name, new Logger(name));
    }
    getLogger(name: string): ILogger {
        const logger = this.loggers.get(name);
        if (!logger) {
            throw new Error(`Logger with name ${name} not registered!`)
        }
        return logger;
    }
    removeLogger(name: string): boolean {
        return this.loggers.delete(name);
    }

}

enhanceClass(LoggerManager, "LoggerManager");