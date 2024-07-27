import { Routes } from "../constants";
import { PageRenderer } from "./PageRenderer"

describe("PageRenderer", () => {
    const originalWarn = console.warn;

    beforeEach(() => {
        console.warn = jest.fn();
    });

    afterAll(() => {
        console.warn = originalWarn;
    });
    
    it("addPage saves a page for rendering", () => {
        const pageRenderer = new PageRenderer(Routes["/form"]);
        pageRenderer.addPage("/asd", {} as React.ReactElement);
        expect(() => {pageRenderer.renderPage("/form")}).not.toThrow();
    });
    it("renderPage returns default page if it is registered", () => {
        const pageRenderer = new PageRenderer(Routes["/form"]);
        const spy = jest.spyOn(console, "warn");
        expect(pageRenderer.renderPage("asd")).toBeUndefined();
        expect(spy).toHaveBeenCalledTimes(1);
        pageRenderer.addPage("asd", {} as React.ReactElement);
        expect(pageRenderer.renderPage("asd")).not.toBeUndefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });
})