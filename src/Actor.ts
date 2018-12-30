import { Context, Interaction } from "./types"

export default class Actor<Api = {}, Session = {}> {
  private readonly name: string
  private readonly api: Api
  private readonly session: Session

  constructor(name: string, api: Api, session: Session) {
    this.name = name
    this.api = api
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  /**
   * Use this in Given steps to set up a context
   *
   * @param context a function that sets up context
   */
  public async has(context: Context<Api>): Promise<void> {
    await context(this.api, this.getName())
  }

  /**
   * Use this in When steps to set up a context
   *
   * @param interaction a function that interacts with the system via a {@link ISession}
   */
  public async attemptsTo(interaction: Interaction<Session, void>): Promise<void> {
    return interaction(this.session)
  }

  /**
   * Use this in Then steps to pull data out of the system (e.g. using a view)
   *
   * @param interaction a function that interacts with the system via a {@link ISession}
   */
  public async check<Result>(interaction: Interaction<Session, Result>): Promise<Result> {
    return interaction(this.session)
  }
}
