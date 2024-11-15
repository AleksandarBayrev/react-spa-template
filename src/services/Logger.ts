import { enhanceClass } from "@app-root/base/helpers";
import { ILogger } from "@app-root/interfaces";

export class Logger implements ILogger {
    constructor(private readonly loggerContext: string) {}

    info(message: string): Promise<void> {
        return new Promise((res) => {
            setTimeout(() => {
                console.log(this.getMessage(message));
                res();
            });
        });
    }

    warn(message: string): Promise<void> {
        return new Promise((res) => {
            setTimeout(() => {
                console.warn(this.getMessage(message));
                res();
            });
        });
    }

    error(message: string): Promise<void> {
        return new Promise((res) => {
            setTimeout(() => {
                console.error(this.getMessage(message));
                res();
            });
        });
    }

    private getMessage(message: string) {
        return `(${this.loggerContext}) [${new Date().toISOString()}] => ${message}`;
    }
}

enhanceClass(Logger, "Logger");