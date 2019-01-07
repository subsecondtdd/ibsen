/// <reference types="node" />
import Actor from "./Actor";
import http from "http";
import { Context, Interaction, SessionFactory } from "./types";
export { Actor, Context, Interaction, SessionFactory };
interface IbsenOptions<Api> {
    makeRenderApp: (session: any) => ($root: HTMLElement) => void;
    makeDomainApi: () => Api;
    makeHttpApi: (baseurl: string) => Api;
    makeHttpServer: (api: Api) => Promise<http.Server>;
}
export interface IbsenWorld<Api> {
    makeSession<Session>(actorName: string, sessionFactory: SessionFactory<Api, Session>): Session;
}
export default function ibsen<Api>(options: IbsenOptions<Api>): void;
