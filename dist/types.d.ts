export declare type Context<Api> = (api: Api) => Promise<void>;
export declare type Interaction<Session, Result> = (session: Session) => Promise<Result>;
