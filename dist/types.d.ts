export interface IStartable {
    start(): void;
}
export interface IStoppable {
    stop(): void;
}
export interface ISession extends IStartable, IStoppable {
}
export declare type Context<Api> = (api: Api, actorName: string) => Promise<void>;
export declare type Interaction<T> = (session: ISession) => Promise<T>;
