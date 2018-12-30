import { ISession } from "./types";
export default class ApiSession<Api> implements ISession {
    actorName: string;
    api: Api;
    constructor(actorName: string, api: Api);
    start(): void;
    stop(): void;
}
