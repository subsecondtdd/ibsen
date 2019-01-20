export declare type Context<Api> = (api: Api) => Promise<void>;
export declare type Action<Session, NextSession = void> = (session: Session) => Promise<NextSession>;
export declare type Outcome<Session, Result> = (session: Session) => Promise<Result>;
export declare type SessionFactory<Api, Session> = {
    ApiSession: (actorName: string, api: Api) => Session;
    DomSession: (actorName: string, api: Api, $root: HTMLElement) => Session;
};
