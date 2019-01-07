import { Action, Outcome, SessionFactory } from "./types"
import { IbsenWorld } from "./ibsen"

/**
 * An Actor is used to interact with the system in When and Then steps.
 * (For Given steps, interact with the system using this.context).
 */
export default class Actor<Api = {}> {
  private readonly name: string
  private readonly world: IbsenWorld<Api>

  private sessionFactory: SessionFactory<Api, any>
  private session: any

  constructor(name: string, world: IbsenWorld<Api>) {
    this.name = name
    this.world = world
  }

  public getName(): string {
    return this.name
  }

  /**
   * Use this in When steps to set up a context
   *
   * @param action a function that interacts with the system via a Session
   * @param sessionFactory a factory for creating a session
   */
  public async attemptsTo<Session, NextSession>(action: Action<Session, NextSession>, sessionFactory: SessionFactory<Api, Session>): Promise<void> {
    const nextSession = await action(this.getSession(sessionFactory))
    if (nextSession) {
      this.session = nextSession
    }
  }

  /**
   * Use this in Then steps to pull data out of the system (e.g. using a view)
   *
   * @param outcome a function that interacts with the system via a Session
   */
  public async check<Session, Result>(outcome: Outcome<Session, Result>): Promise<Result> {
    return outcome(this.getSession(this.sessionFactory))
  }

  private getSession<Session>(sessionFactory: SessionFactory<Api, Session>): Session {
    if (sessionFactory !== this.sessionFactory) {
      this.session = this.world.makeSession(this.getName(), sessionFactory)
      this.sessionFactory = sessionFactory
    }
    return this.session
  }
}
