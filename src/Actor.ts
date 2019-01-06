import { Interaction } from "./types"

/**
 * An Actor is used to interact with the system in When and Then steps.
 * (For Given steps, interact with the system using this.context).
 */
export default class Actor<Api = {}, Session = {}> {
  private readonly name: string
  private readonly api: Api
  private readonly session: Session
  private readonly memory = new Map<any, any>()

  constructor(name: string, api: Api, session: Session) {
    this.name = name
    this.api = api
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  /**
   * Remember something
   *
   * @param key the name of the thing to remember
   * @param value what to remember
   */
  public remember(key: any, value: any) {
    this.memory.set(key, value)
  }

  /**
   * Recall something previously remembered
   *
   * @param key the name of the thing to recall
   * @return the value that was recalled
   * @throws Error if nothing can be recalled.
   */
  public recall<T>(key: any): T {
    if (!this.memory.has(key)) {
      throw new Error(`${this.name} does not recall anything about ${key}`)
    }
    return this.memory.get(key)
  }

  /**
   * Use this in When steps to set up a context
   *
   * @param interaction a function that interacts with the system via a Session
   * @param rememberKey an optional key to remember the result of the interaction
   */
  public async attemptsTo(interaction: Interaction<Session, void>, rememberKey?: any): Promise<void> {
    const value = await interaction(this.session)
    if (rememberKey !== undefined) {
      this.remember(rememberKey, value)
    }
  }

  /**
   * Use this in Then steps to pull data out of the system (e.g. using a view)
   *
   * @param interaction a function that interacts with the system via a Session
   */
  public async check<Result>(interaction: Interaction<Session, Result>): Promise<Result> {
    return interaction(this.session)
  }
}
