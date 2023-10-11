import { enhanceClass } from "../base";
import { IUrlParser } from "../interfaces";

export class UrlParser implements IUrlParser {
    parseUrl(url: URL): string {
        const path = url.pathname;
        const searchParams = url.search;
        return `${path}${searchParams}`;
    }

    getPath(url: URL) {
        return url.pathname;
    }
}

enhanceClass(UrlParser, "UrlParser");