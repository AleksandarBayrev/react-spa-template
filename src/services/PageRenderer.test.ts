import { PageRenderer } from "./PageRenderer"

describe("PageRenderer", () => {
    it("addPage saves a page for rendering", () => {
        const pageRenderer = new PageRenderer();
        pageRenderer.addPage("/asd", {} as React.ReactElement);
        expect(() => {pageRenderer.renderPage("asd")}).not.toThrow();
    });
    it("renderPage returns 404 page if page is not registered", () => {
        const pageRenderer = new PageRenderer();
        const spy = jest.spyOn(console, "warn");
        pageRenderer.addPage("/404", {} as React.ReactElement);
        expect(pageRenderer.renderPage("asd")).not.toBeUndefined();
        expect(spy).toHaveBeenCalled();
    });
    it("renderPage returns page if it is registered", () => {
        const pageRenderer = new PageRenderer();
        const spy = jest.spyOn(console, "warn");
        pageRenderer.addPage("asd", {} as React.ReactElement);
        expect(pageRenderer.renderPage("asd")).not.toBeUndefined();
        expect(spy).toHaveBeenCalled();
    });
})