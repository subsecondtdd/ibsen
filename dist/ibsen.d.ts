/// <reference types="node" />
import Actor from "./Actor";
import DomainSession from "./DomainSession";
import DomSession from "./DomSession";
import { IncomingMessage, ServerResponse } from "http";
import { Interaction } from "./types";
export { Actor, DomainSession, DomSession, Interaction };
interface IbsenOptions<Api> {
    makeRenderApp: (api: Api) => ($root: HTMLElement) => void;
    makeDomainApi: () => Api;
    makeHttpApi: (baseurl: string) => Api;
    makeRequestListener: (api: Api) => (request: IncomingMessage, response: ServerResponse) => void;
}
export default function ibsen<Api>(options: IbsenOptions<Api>): void;
