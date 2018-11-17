import Interaction from "./Interaction"
import World from "./World"
import ISession from "./ISession"
import IContext from "./IContext"

export default class Actor {
  private readonly name: string
  private readonly context: IContext
  private readonly session: ISession

  constructor(name: string, context: IContext, session: ISession) {
    this.name = name
    this.context = context
    this.session = session
  }

  public getName(): string {
    return this.name
  }

  public async has(actorNameFunction: (actorName: string) => (context: IContext) => Promise<void>): Promise<void> {
    const contextFunction = await actorNameFunction(this.getName())
    return contextFunction(this.context)
  }

  public async attemptsTo(interaction: Interaction<void>): Promise<void> {
    return this.callSessionFunction(interaction)
  }

  public async check<T>(interaction: Interaction<T>): Promise<T> {
    return this.callSessionFunction(interaction)
  }

  private async callSessionFunction<T>(interaction: Interaction<T>): Promise<T> {
    const key = this.session.constructor.name
    const sessionFunction = interaction[key]
    if (!sessionFunction) throw new Error(`No ${key} in ${Object.keys(interaction)}`)
    return sessionFunction(this.session)
  }
}
