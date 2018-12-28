import webdriverio from "webdriverio";
import { ISession } from "./types";
/**
 * The Dom Actor interacts with the Dom. It also has a reference to the codebreaker, so it can query for its
 * version. This is used to wait for synchronisation before interacting with the DOM.
 */
export default class WebDriverSession implements ISession {
    private readonly baseUrl;
    private browser;
    constructor(baseUrl: string);
    start(): Promise<void>;
    stop(): Promise<void>;
    invokeAction(activity: (...args: any[]) => void): void;
    getTestView(): Promise<webdriverio.RawResult<any>>;
}
