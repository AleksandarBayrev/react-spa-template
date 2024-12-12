import { enhanceClass } from "./enhanceClass";

describe("enhanceClass", () => {
    it("maps className to a class", () => {
        class MyClass {};
        enhanceClass(MyClass, "MyClass");
        expect((MyClass as any)["className"]).toBe("MyClass");
    });
});