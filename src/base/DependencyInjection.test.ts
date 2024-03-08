import { DependencyInjection } from "./DependencyInjection";
import { enhanceClass } from "./enhanceClass";
import { AvailableServices } from "./types";

describe("DependencyInjection", () => {
    beforeEach(() => {
        if (DependencyInjection["instance"] === null) {
            DependencyInjection.setupInstance(console.log, true);
        }
    });
    it("getInstance returns instance", () => {
        const instanceOne = DependencyInjection.getInstance();
        const instanceTwo = DependencyInjection.getInstance();
        expect(instanceOne).toEqual(instanceTwo);
    });
    it("getInstance throws if setup is not performed", () => {
        DependencyInjection["instance"] = null;
        try {
            DependencyInjection.getInstance();
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("registerService registers an instance", () => {
        interface IMyLogger {};
        class MyLogger implements IMyLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyLogger>("IMyLogger" as AvailableServices, "singleton", MyLogger, []);
        expect(DependencyInjection.getInstance().hasService("IMyLogger" as AvailableServices));
    });
    it("registerService with singleton returns the same instance", () => {
        interface IMyNewLogger {};
        class MyLogger implements IMyNewLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyNewLogger>("IMyNewLogger" as AvailableServices, "singleton", MyLogger, []);
        const instanceOne = DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        const instanceTwo = DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        expect(instanceOne).toBe(instanceTwo);
    });
    it("registerService with transient does not return the same instance", () => {
        interface IMyNewNewLogger {
            name: string;
        };
        class MyLogger implements IMyNewNewLogger {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
        };
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices, "transient", MyLogger, ["asd"]);
        const instanceOne = DependencyInjection.getInstance().getService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices);
        const instanceTwo = DependencyInjection.getInstance().getService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices);
        expect(instanceOne).not.toBe(instanceTwo);
    });
});