export type Context<Api> = (api: Api) => Promise<void>

export type Interaction<Session, Result> = (session: Session) => Promise<Result>
