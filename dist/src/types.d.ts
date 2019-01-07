export declare type Context<Api> = (api: Api) => Promise<void>;
export declare type Interaction<Session, Result> = (session: Session) => Promise<Result>;
export declare type SessionFactory<Api, Session> = {
    ApiSession: (actorName: string, api: Api) => Session;
    DomSession: (actorName: string, $root: HTMLElement) => Session;
};
