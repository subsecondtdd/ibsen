export type Context<Api> = (api: Api) => Promise<void>

export type Interaction<Session, Result> = (session: Session) => Promise<Result>

export type SessionFactory<Api, Session> = {
  ApiSession: (actorName: string, api: Api) => Session,
  DomSession: (actorName: string, $root: HTMLElement) => Session
}
