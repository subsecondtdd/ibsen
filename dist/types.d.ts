export interface IStartable {
    start(): void;
}
export interface IStoppable {
    stop(): void;
}
export declare type Context<Api> = (api: Api, actorName: string) => Promise<void>;
export declare type Interaction<Session, Result> = (session: Session) => Promise<Result>;
