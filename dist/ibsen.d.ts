/// <reference types="node" />
import Actor from "./Actor";
import ApiSession from "./ApiSession";
import DomSession from "./DomSession";
import { IncomingMessage, ServerResponse } from "http";
import { Interaction, ISession } from "./types";
export { Actor, ApiSession, DomSession, Interaction };
interface IbsenOptions<Api> {
    makeRenderApp: (api: Api) => ($root: HTMLElement) => void;
    makeDomainApi: () => Api;
    makeHttpApi: (baseurl: string) => Api;
    makeRequestListener: (api: Api) => (request: IncomingMessage, response: ServerResponse) => void;
    makeSession?: (sessionType: string, actorName: string) => ISession;
    makeApiSession?: (actorName: string, api: Api) => ApiSession<Api>;
}
export default function ibsen<Api>(options: IbsenOptions<Api>): void;
