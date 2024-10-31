import { BasePage } from "@app-base/BasePage";

describe("BasePage", () => {
    it("is a class", () => {
        expect(typeof BasePage === "function").toBe(true);
    })
});