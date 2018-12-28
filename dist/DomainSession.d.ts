import { ISession } from "./types";
export default class DomainSession<Api> implements ISession {
    actorName: string;
    api: Api;
    constructor(actorName: string, api: Api);
    start(): void;
    stop(): void;
}
