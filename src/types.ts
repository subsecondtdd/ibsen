export interface IStartable {
  start(): void
}

export interface IStoppable {
  stop(): void
}

export type Context<Api> = (api: Api, actorName: string) => Promise<void>

export type Interaction<Session, Result> = (session: Session) => Promise<Result>
