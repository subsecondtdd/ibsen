/// <reference types="node" />
import Actor from "./Actor";
import http from "http";
import { Action, Context, Outcome, SessionFactory } from "./types";
export { Actor, Context, Action, Outcome, SessionFactory };
interface IbsenOptions<Api, InitialSession> {
    makeDomainApi: () => Api;
    makeHttpApi: (baseurl: string) => Api;
    makeHttpServer: (api: Api) => Promise<http.Server>;
    initialSessionFactory: () => SessionFactory<Api, InitialSession>;
    initialRender: ($root: HTMLElement, session: InitialSession) => void;
}
export interface IbsenWorld<Api, InitialSession> {
}
export default function ibsen<Api, InitialSession>(options: IbsenOptions<Api, InitialSession>): void;
