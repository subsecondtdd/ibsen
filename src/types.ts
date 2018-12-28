export interface IStartable {
  start(): void
}

export interface IStoppable {
  stop(): void
}

export interface ISession extends IStartable, IStoppable {
}

export type Context<Api> = (api: Api, actorName: string) => Promise<void>

export type Interaction<T> = (session: ISession) => Promise<T>
