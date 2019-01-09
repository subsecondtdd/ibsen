export type Context<Api> = (api: Api) => Promise<void>

export type Action<Session, NextSession = void> = (session: Session) => Promise<NextSession>

export type Outcome<Session, Result> = (session: Session) => Promise<Result>

export type SessionFactory<Api, Session> = {
  ApiSession: (actorName: string, api: Api) => Session,
  DomSession: (actorName: string, $root: HTMLElement, api: Api) => Session
}
