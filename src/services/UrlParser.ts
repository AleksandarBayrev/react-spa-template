import { enhanceClass } from "../base";
import { IUrlParser } from "../interfaces";

export class UrlParser implements IUrlParser {
    parseUrl(url: URL): string {
        const path = url.pathname;
        const searchParams = url.searchParams.size ? `?${url.searchParams.toString()}` : '';
        return `${path}${searchParams}`;
    }   
}

enhanceClass(UrlParser, "UrlParser");