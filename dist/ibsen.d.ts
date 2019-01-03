/// <reference types="node" />
import Actor from "./Actor";
import http from "http";
import { Interaction } from "./types";
export { Actor, Interaction };
interface IbsenOptions<Api, Session> {
    makeApiSession: (actorName: string, api: Api) => Session;
    makeDomSession: (actorName: string, $root: HTMLElement) => Session;
    makeRenderApp: (api: Api) => ($root: HTMLElement) => void;
    makeDomainApi: () => Api;
    makeHttpApi: (baseurl: string) => Api;
    makeHttpServer: (api: Api) => http.Server;
}
export default function ibsen<Api, Session>(options: IbsenOptions<Api, Session>): void;
